# Alibaba Cloud Function Compute Node.js14 HTTP function case

<toc>



- [Alibaba Cloud Function Compute Node.js14 HTTP function case](#alibaba-cloud-function-compute-nodejs14-http-function-case)
- [Quick start](#quick-start)
  - [Deploy via command line tools](#deploy-via-command-line-tools)
- [Application details](#application-details)

</toc>

# Quick start

## Deploy via command line tools

> Before starting, you need to install the Serverless Devs developer tools: `npm install @serverless-devs/s -g`, for more installation methods, please refer to [Serverless Devs Installation Documentation](https://www.serverless-devs.com/serverless-devs/install) , you also need to configure key information for Alibaba Cloud. For the method of configuring key information, please refer to [Alibaba Cloud Key Configuration Document](https://www.serverless-devs.com/fc/config)

- Enter the project: `cd chatops-itdog-demo`
- Config your account: `s config add`
- Deploy the project: `s deploy -y`
- Invoke function: Directly use POST or GET method curl to the custom domain name that is generated when deploying the project

# Application details

This application is the wrapper of https://www.itdog.cn/http/

After deploy, you can use  by `curl https://YOUR_ENDPOINT/itdog?url=https://www.baidu.com` for example.