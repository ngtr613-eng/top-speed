import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    userAgent: {
      type: String,
      default: 'Unknown',
    },
    ipAddress: {
      type: String,
      default: 'Unknown',
    },
    page: {
      type: String,
      required: true,
    },
    referer: {
      type: String,
      default: 'Direct',
    },
    sessionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    country: {
      type: String,
      default: 'Unknown',
    },
    browser: {
      type: String,
      default: 'Unknown',
    },
    osType: {
      type: String,
      default: 'Unknown',
    },
  },
  {
    timestamps: true,
  }
);

visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ page: 1 });
visitorSchema.index({ sessionId: 1 });

export const Visitor = mongoose.model('Visitor', visitorSchema);
