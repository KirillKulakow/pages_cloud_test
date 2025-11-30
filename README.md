# pages_cloud_test

A Vite-based web application with manual deployment to Cloudflare Pages.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is deployed to Cloudflare Pages using GitHub Actions with manual trigger.

### Triggers

- **Manual trigger**: Go to Actions → "Build and Deploy to Cloudflare Pages" → Run workflow
- Can be triggered on any branch

### Setup Requirements

To enable deployments, add the following secrets to your GitHub repository:

1. **`CLOUDFLARE_API_TOKEN`**: Your Cloudflare API token with Cloudflare Pages permissions
2. **`CLOUDFLARE_ACCOUNT_ID`**: Your Cloudflare account ID

Optionally, you can set a repository variable:

- **`CLOUDFLARE_PROJECT_NAME`**: The name of your Cloudflare Pages project (defaults to `pages-cloud-test`)

### Creating a Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Create a custom token with the following permissions:
   - Account > Cloudflare Pages > Edit
   - Account > Account Settings > Read
4. Copy the token and add it as a GitHub secret