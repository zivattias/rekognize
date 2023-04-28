## Rekognize
Rekognize lets you upload any image (jpg, jpeg, png) you like, and recognizes celebrities in it using AWS Rekognition.

### Powered by:

[FastAPI](https://github.com/tiangolo/fastapi) - REST API framework
   for Python (quick & efficient)\
[Boto3](https://github.com/boto/boto3) - AWS SDK for Python\
[React](https://github.com/facebook/react) - UI framework\
[Vercel](https://vercel.com/) - Frontend deployment\
[AWS EC2](https://aws.amazon.com/pm/ec2/) - Remote machine for REST API
   deployment\

### Usage:
 1. Click on the production link in this Git repository
 2. Upload your image to the UI
 3. Submit and let the magic happen!

> **Note:** Rekognize requires you to *DISABLE* Mixed-Content security settings, since I haven't purchased SSL/TLS certifications for my AWS EC2 server. This shouldn't be a fatal problem, since you're only disabling it for this specific website!
> For more information, please visit: `chrome://settings/content/insecureContent?search=insecure` using Google Chrome.
