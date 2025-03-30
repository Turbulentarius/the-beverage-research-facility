# The Beverage-Research Facility
The Chaotic Beverage Research Facility (A NextJS Experiment)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The **Chaotic Beverage Research Facility** is created with **React 19** and **Next.js 15.2.3**.

## Development

While developing, use the following on the host-os:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment
I plan to deploy on my own server and domain name over SSH — `cbrf.turbulentarius.com`


### Why not deploy on Vercel?
I **really** should not have to argue why. But here is a few reasons:

- I already have access to servers on Hetzner and AWS
- Deploying on vercel means the app will be hosted on their servers
- I don't want to use a `*.vercel.app` subdomain when I already own several domain names I can use.
- Vendor lock-in; I don't want to introduce another dependency that I don't trust.
- Self-hosting is easier for me, and gives me full control over the server.
