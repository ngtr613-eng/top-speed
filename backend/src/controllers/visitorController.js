import { Visitor } from '../models/Visitor.js';
import UAParser from 'ua-parser-js';

export const trackVisitor = async (req, res) => {
  try {
    const { page } = req.body;
    const userAgent = req.get('user-agent') || 'Unknown';
    const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';
    const referer = req.get('referer') || 'Direct';
    const sessionId = req.get('x-session-id') || null;

    // Parse user agent to get browser and OS info
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const browser = `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim();
    const osType = `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim();

    const visitor = new Visitor({
      userAgent,
      ipAddress,
      page,
      referer,
      sessionId: sessionId || undefined,
      browser,
      osType,
    });

    await visitor.save();
    res.status(201).json({ message: 'Visitor tracked', visitor });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getVisitorStats = async (req, res) => {
  try {
    const { page, days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const query = { createdAt: { $gte: startDate } };
    if (page) {
      query.page = page;
    }

    const visitors = await Visitor.find(query)
      .sort({ createdAt: -1 })
      .limit(1000);

    const totalVisitors = visitors.length;

    // Group by page
    const pageVisits = {};
    visitors.forEach((v) => {
      pageVisits[v.page] = (pageVisits[v.page] || 0) + 1;
    });

    // Group by browser
    const browserStats = {};
    visitors.forEach((v) => {
      browserStats[v.browser] = (browserStats[v.browser] || 0) + 1;
    });

    // Group by OS
    const osStats = {};
    visitors.forEach((v) => {
      osStats[v.osType] = (osStats[v.osType] || 0) + 1;
    });

    // Unique IPs (unique visitors)
    const uniqueVisitors = new Set(visitors.map((v) => v.ipAddress)).size;

    res.json({
      totalVisitors,
      uniqueVisitors,
      pageVisits: Object.entries(pageVisits)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count),
      browsers: Object.entries(browserStats)
        .map(([browser, count]) => ({ browser, count }))
        .sort((a, b) => b.count - a.count),
      osTypes: Object.entries(osStats)
        .map(([os, count]) => ({ os, count }))
        .sort((a, b) => b.count - a.count),
      recentVisitors: visitors.slice(0, 50),
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllVisitors = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Visitor.countDocuments();

    res.json({
      visitors,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteOldVisitors = async (req, res) => {
  try {
    const { days = 90 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await Visitor.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    res.json({
      message: `Deleted ${result.deletedCount} visitors older than ${days} days`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting visitors:', error);
    res.status(500).json({ error: error.message });
  }
};
