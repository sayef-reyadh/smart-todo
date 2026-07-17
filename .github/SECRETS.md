# GitHub Actions Secrets Setup

All secrets are stored in **GitHub → Settings → Secrets and variables → Actions → Secrets**.

> **Never commit secrets to the repository.** Every value below must be added as a GitHub Actions secret, not hardcoded in any file.

---

## Complete secrets list

| Secret | Used by | Required |
|--------|---------|----------|
| `AWS_ACCESS_KEY_ID` | deploy-backend | ✅ |
| `AWS_SECRET_ACCESS_KEY` | deploy-backend | ✅ |
| `JWT_SECRET_KEY` | deploy-backend | ✅ |
| `PASSWORD_PEPPER` | deploy-backend | ✅ |
| `CORS_ORIGINS_RAW` | deploy-backend | ✅ |
| `VERCEL_TOKEN` | deploy-frontend | ✅ |
| `VERCEL_ORG_ID` | deploy-frontend | ✅ |
| `VERCEL_PROJECT_ID` | deploy-frontend | ✅ |
| `VITE_API_BASE_URL` | deploy-frontend | ✅ |

---

## 1. AWS credentials — `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`

These let CDK deploy infrastructure (Lambda, DynamoDB, API Gateway) to your AWS account.

**Where to get them:**

1. Sign in to [AWS Console](https://console.aws.amazon.com)
2. Click your account name (top right) → **Security credentials**
3. Scroll to **Access keys** → **Create access key**
4. Choose **"Command Line Interface (CLI)"** → Next → Create
5. Copy **Access key ID** → GitHub secret `AWS_ACCESS_KEY_ID`
6. Copy **Secret access key** → GitHub secret `AWS_SECRET_ACCESS_KEY`

> ⚠️ The secret access key is shown **only once**. Save it immediately.

**Minimum IAM permissions needed** (or use AdministratorAccess for simplicity):
- `cloudformation:*`
- `lambda:*`
- `dynamodb:*`
- `apigateway:*`
- `iam:*`
- `s3:*` (CDK staging bucket)
- `ssm:GetParameter` (CDK bootstrap version check)

---

## 2. JWT signing secret — `JWT_SECRET_KEY`

Used by the Lambda to sign and verify JWT access tokens.

**Rules:**
- Must be at least 32 characters long
- Must be random and unpredictable — do NOT use a memorable word

**How to generate a strong value:**

```bash
# Option A — Python
python -c "import secrets; print(secrets.token_urlsafe(48))"

# Option B — PowerShell
[System.Convert]::ToBase64String((1..48 | ForEach-Object { [byte](Get-Random -Max 256) }))

# Option C — OpenSSL
openssl rand -base64 48
```

Example (do NOT copy this — generate your own):
```
xK9mP2vR7qL4nT0wY5uE8jC3sA6hD1fB
```

---

## 3. Password pepper — `PASSWORD_PEPPER`

Mixed into every password before bcrypt hashing. If the database is stolen, an attacker still cannot crack passwords without this value.

**Rules:**
- Must be at least 32 characters long
- Must be different from `JWT_SECRET_KEY`
- Must never change after users have registered — changing it invalidates all passwords

**How to generate:**

```bash
# Same methods as JWT_SECRET_KEY above
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

> ⚠️ Store this somewhere safe offline as well (password manager, encrypted notes). If you lose it, all user passwords become unverifiable.

---

## 4. CORS allowed origins — `CORS_ORIGINS_RAW`

Comma-separated list of browser origins allowed to call the API with credentials (required for the httpOnly refresh-token cookie).

**Format:**
```
https://your-app.vercel.app,http://localhost:5173
```

**Where to find your Vercel URL:**
- Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- Open your `smart-todo` project
- Copy the **Production** URL from the top (e.g. `https://smart-todo-ruby.vercel.app`)

**Example value:**
```
https://smart-todo-ruby.vercel.app,http://localhost:5173
```

> `http://localhost:5173` is included so local development works against the deployed backend.

---

## 5. Vercel token — `VERCEL_TOKEN`

Authenticates the Vercel CLI in the deploy-frontend workflow.

**Where to get it:**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create** → give it a name (e.g. `github-actions`) → No expiry or 1 year
3. Copy the token → GitHub secret `VERCEL_TOKEN`

---

## 6. Vercel org ID — `VERCEL_ORG_ID`

Identifies your Vercel team or personal account.

**Where to find it:**

**For a team:**
1. Go to your Vercel team dashboard
2. **Settings** → **General**
3. Copy **Team ID** (starts with `team_`)

**For a personal account:**
1. Go to [vercel.com/account](https://vercel.com/account)
2. **Settings** → **General**
3. Copy **Vercel ID**

**Or run this locally** (fastest):
```bash
cd frontend
npx vercel link    # follow prompts to link project
cat .vercel/project.json
# → { "orgId": "team_xxxx", "projectId": "prj_xxxx" }
```

---

## 7. Vercel project ID — `VERCEL_PROJECT_ID`

Identifies the specific Vercel project to deploy to.

**Where to find it:**
1. Go to your project on [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Settings** → **General**
3. Copy **Project ID** (starts with `prj_`)

**Or** from the `.vercel/project.json` file after running `vercel link` (see above).

---

## 8. API base URL — `VITE_API_BASE_URL`

The AWS API Gateway URL that the frontend calls. Baked into the Vite build at deploy time.

**Where to find it:**
- Run `cdk deploy` locally → the URL is printed as `SmartTodoStack.ApiUrl` in the output
- **Or** check the **deploy-backend** GitHub Actions job summary after it runs — the URL is printed there automatically
- **Or** go to [AWS Console → API Gateway → APIs](https://console.aws.amazon.com/apigateway) → `smart-todo-api` → copy the Invoke URL

**Format:**
```
https://xxxxxxxxxx.execute-api.us-east-2.amazonaws.com/api
```

> **Include `/api` at the end.** The axios client uses this as the base URL and appends paths like `/auth/signup` and `/tasks` directly.

---

## How to add a secret to GitHub

1. Go to your repository on GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter the **Name** (exact match, case-sensitive) and **Value**
5. Click **Add secret**

**Or use the GitHub CLI** (if `gh` is installed):
```bash
gh secret set SECRET_NAME --body "secret-value" --repo your-org/smart-todo
```

---

## Verify all secrets are set

```bash
gh secret list --repo your-org/smart-todo
```

Expected output:
```
AWS_ACCESS_KEY_ID      Updated 2026-07-18
AWS_SECRET_ACCESS_KEY  Updated 2026-07-18
JWT_SECRET_KEY         Updated 2026-07-18
PASSWORD_PEPPER        Updated 2026-07-18
CORS_ORIGINS_RAW       Updated 2026-07-18
VERCEL_TOKEN           Updated 2026-07-18
VERCEL_ORG_ID          Updated 2026-07-18
VERCEL_PROJECT_ID      Updated 2026-07-18
VITE_API_BASE_URL      Updated 2026-07-18
```

---

## One-time AWS CDK bootstrap

Before the first deploy, CDK needs to provision its own resources (S3 bucket, IAM roles) in your account. This only needs to be run **once per AWS account + region**.

```bash
cd infra
python -m venv .venv
.venv\Scripts\Activate.ps1        # Windows PowerShell
pip install -r requirements.txt
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-2 --app "python app.py"
```

Find your account ID: AWS Console → top-right account menu, or `aws sts get-caller-identity`.
