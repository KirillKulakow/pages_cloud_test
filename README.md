# pages_cloud_test

A Vite-based web application with automatic deployment to Cloudflare Pages.

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

This project is automatically deployed to Cloudflare Pages using GitHub Actions.

### Triggers

- **Push to `main` branch**: Automatically builds and deploys to Cloudflare Pages
- **Pull requests to `main`**: Builds and deploys a preview version

### Setup Requirements

To enable automatic deployments, add the following secrets to your GitHub repository:

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