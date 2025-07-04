# Performance Analysis GitHub Action

This GitHub Action automatically analyzes the performance of your application when a pull request is created, synchronized, or reopened. It injects an `access_token` cookie before each evaluation and provides a summary of the results as a comment on the pull request.

## How It Works

1. When a pull request is created, synchronized, or reopened, the action is triggered.
2. It uses Lighthouse CI to analyze the specified URLs with the `access_token` cookie injected.
3. It generates a performance report with scores for performance, accessibility, best practices, and SEO.
4. It comments on the pull request with the results.

## Setup

### 1. Configure Secrets

You need to set up the following secrets in your GitHub repository:

- `ACCESS_TOKEN`: The value of the access_token cookie that will be injected before each evaluation.
- `LHCI_GITHUB_APP_TOKEN` (optional): A token for the Lighthouse CI GitHub App if you want to use it for more detailed reporting.

To add these secrets:

1. Go to your repository on GitHub.
2. Click on "Settings" > "Secrets and variables" > "Actions".
3. Click on "New repository secret".
4. Add the secrets with their respective values.

### 2. Customize URLs

By default, the action analyzes the following URLs:

- `https://fernando-espinosa-clip.github.io/Score-Calculator/`
- `https://fernando-espinosa-clip.github.io/Score-Calculator/?page=results`

You can customize these URLs by editing the `lighthouserc.json` configuration in the `.github/workflows/performance-analysis.yml` file.

### 3. Customize Performance Thresholds

You can customize the performance thresholds by editing the `assertions` section in the `lighthouserc.json` configuration. By default, the thresholds are:

- Performance: 0.8 (80%)
- Accessibility: 0.9 (90%)
- Best Practices: 0.9 (90%)
- SEO: 0.9 (90%)

## Example Output

The action will comment on the pull request with a summary of the results, including:

- The URLs that were analyzed
- A link to the detailed Lighthouse CI report
- A summary of the analysis

## Troubleshooting

If you encounter any issues with the action, check the following:

1. Make sure the `ACCESS_TOKEN` secret is properly set up.
2. Make sure the URLs are accessible from the GitHub Actions runner.
3. Check the action logs for any error messages.

## Further Customization

For more advanced customization options, refer to the [Lighthouse CI documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md).