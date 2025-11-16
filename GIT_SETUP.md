# Git & Version Control Setup

## Initialize Git Repository

```bash
cd ~/Documents/Projects/Portfolio
git init
```

## Create .gitignore (if not exists)

The `.gitignore` files have already been created in both directories:
- `backend/.gitignore` - Ignores node_modules, .env, logs
- `frontend/.gitignore` - Ignores node_modules, dist, .env

## Add Files to Git

```bash
git add .
git status  # Review changes
```

## Initial Commit

```bash
git commit -m "Initial commit: Complete MERN portfolio setup"
```

## Remote Repository Setup

### Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create repository named `portfolio`
3. Don't initialize with README (we have one)
4. Click "Create repository"

### Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch if needed
git branch -M main

# Push initial commit
git push -u origin main
```

## Branching Strategy (Recommended)

```bash
# Create development branch
git checkout -b develop
git push -u origin develop

# Create feature branches for new features
git checkout -b feature/add-blog
# ... make changes
git push -u origin feature/add-blog
# Create Pull Request on GitHub

# Merge to main after review
git checkout main
git pull origin main
git merge feature/add-blog
git push origin main
```

## Useful Git Commands

### View Status
```bash
git status
```

### View Commit History
```bash
git log --oneline -10
```

### Revert Changes
```bash
git checkout -- filename  # Discard changes to file
git reset HEAD filename   # Unstage file
git revert <commit-hash>  # Revert specific commit
```

### Create Tags for Releases
```bash
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

## GitHub Actions Workflows

The project includes automatic deployment workflows:

### Backend Deployment (`deploy-backend.yml`)
- Triggers on push to main in `backend/` directory
- Automatically deploys to Render

### Frontend Deployment (`deploy-frontend.yml`)
- Triggers on push to main in `frontend/` directory
- Automatically deploys to Vercel

## Setting Up Secrets for CI/CD

### For Render Backend Deployment

Go to GitHub Repository → Settings → Secrets and Variables → Actions

Add:
- `RENDER_DEPLOY_HOOK`: Your Render deploy hook URL

### For Vercel Frontend Deployment

Go to GitHub Repository → Settings → Secrets and Variables → Actions

Add:
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Protecting Main Branch

### In GitHub Repository Settings:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
   - ✅ Dismiss stale pull request approvals

## Commit Message Convention

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: correct project image loading"
git commit -m "docs: update API documentation"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify contact form logic"
git commit -m "chore: update dependencies"
```

### Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Build/dependency updates

## Handling Secrets

**Important**: Never commit `.env` files!

### Safely handle environment variables:

```bash
# Create .env (in .gitignore)
echo "MONGODB_URI=..." > backend/.env

# Team members:
cp .env.example .env
# Then edit with their own credentials
```

## Collaborating with Team

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### Set Up Development
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your settings

# Frontend
cd frontend
npm install
cp .env.example .env
# Edit .env with your settings
```

### Pull Latest Changes
```bash
git pull origin develop
```

### Submit Changes
```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: your feature"
git push -u origin feature/your-feature
# Create Pull Request on GitHub
```

## GitHub Issues & Project Board

### Track Development

1. Go to GitHub Repository
2. Click **Projects** → **New Project**
3. Create "Portfolio Development" project
4. Add columns: Todo, In Progress, Done
5. Add issues for each feature/bug

### Issue Template

**Title**: Clear, concise description

**Description**:
```markdown
## Description
What is the issue?

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- OS: macOS
- Node: 18.x
- etc.
```

## Release Checklist

Before deploying a release:

- [ ] All tests passing
- [ ] No console errors
- [ ] Updated CHANGELOG.md
- [ ] Updated version in package.json
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Tagged in Git: `git tag -a v1.x.x`
- [ ] Released on GitHub

## Useful GitHub Features

### Code Review
- Review pull requests
- Add comments
- Suggest changes
- Request changes

### Issues
- Report bugs
- Request features
- Discuss ideas
- Track progress

### Discussions
- Q&A with contributors
- Show and tell
- Announcements

### Pages
- Deploy documentation
- Project website
- User guide

## Maintenance

### Regular Updates
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Major version updates
npm install package@latest
```

### Before Updating
```bash
# Create backup branch
git checkout -b backup/main
git push -u origin backup/main

# Test updates locally
npm install
npm run build
npm run dev
```

## Troubleshooting

### Merge Conflicts
```bash
# See conflicts
git status

# Edit files to resolve
# Then:
git add .
git commit -m "resolve: merge conflicts"
git push
```

### Undo Last Commit
```bash
git reset --soft HEAD~1  # Keep changes
git reset --hard HEAD~1  # Discard changes
```

### Cherry Pick Commits
```bash
git cherry-pick <commit-hash>
```

---

**Your portfolio is version-controlled and ready for collaboration! 🎉**
