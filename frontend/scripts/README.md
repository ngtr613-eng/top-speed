This folder contains helper scripts to assist with Vercel domain setup.

Automated workflow (recommended)
- The repository includes a GitHub Actions workflow at `.github/workflows/add-vercel-domain.yml`.
- To run it:
  1. In your repository settings, add a secret named `VERCEL_TOKEN` with a Vercel personal token that has access to the project.
  2. Go to the repository Actions tab → "Add Vercel Domain" → Run workflow.
  3. Provide the `deploymentUrl` input (the current deployment URL shown in your Vercel dashboard) and run.

Manual local script
- Use `add-vercel-domain.ps1` in this folder if you prefer running locally. It requires the Vercel CLI and that you're logged in:

```powershell
cd frontend
.\scripts\add-vercel-domain.ps1 <your-deployment-url>
```

If the domain `topspeed.vercel.app` is unavailable or reserved, use a custom domain and follow Vercel's DNS instructions.
