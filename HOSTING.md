# Khelat Bhawan Hosting & Access Handover

This document records the production hosting setup without storing passwords, OTPs, recovery codes, API tokens, or other account secrets.

## Production services

- Production website: <https://khelatbhawan.com>
- Canonical domain: `khelatbhawan.com`
- `www` address: `www.khelatbhawan.com`
- Domain registrar and DNS manager: GoDaddy
- GoDaddy product visible in the client account: **Web Hosting Deluxe**
- Source repository: <https://github.com/jannat-website-idea/khelat-bhawan-heritage>
- Current application deployment: Vercel
- Framework: React + Vite
- Build command: `npm run build`
- Output directory: `dist`
- Enquiry recipient: `domainname.03@gmail.com`

## Current DNS connection

The production domain currently resolves to the Vercel deployment:

- Root/apex A record: `76.76.21.21`
- `www` CNAME: `cname.vercel-dns-0.com`

Do not replace or remove these records unless the website is intentionally being moved away from Vercel. DNS changes can temporarily take the public website offline.

## Access required for future maintenance

Keep these accounts client-owned and share access privately when maintenance is required:

1. GoDaddy account containing `khelatbhawan.com` and Web Hosting Deluxe.
2. GitHub account with access to the source repository.
3. Vercel account/project serving the production website.
4. `domainname.03@gmail.com` for enquiry notifications and FormSubmit activation.
5. The dedicated Khelat Bhawan Sanity account when CMS work resumes.

Never commit passwords, OTPs, recovery codes, authentication cookies, API tokens, or `.env` files to GitHub. The repository ignores `.env*` files for this reason.

## Publishing an update

1. Make and test the changes locally.
2. Run `npm run build`.
3. Commit and push the changes to the `main` branch on GitHub.
4. Confirm that Vercel completes the production deployment.
5. Verify <https://khelatbhawan.com> on desktop and mobile.
6. Test the contact form without using a real visitor's private information.

## Enquiry delivery

- The website validates phone numbers, email format, and the 20-word minimum message length before submission.
- Client notifications are delivered to `domainname.03@gmail.com`.
- Visitors receive an automatic acknowledgement stating that the Khelat Bhawan team will connect within 48 hours.
- FormSubmit has been activated for the production domain.

## GoDaddy recovery notes

If the domain stops opening but the Vercel deployment still works, first check the two DNS records above in GoDaddy. Do not purchase another hosting product or domain during troubleshooting. The existing domain and Web Hosting Deluxe subscription remain client-owned.
