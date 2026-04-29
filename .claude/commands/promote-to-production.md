Promote all files from ux-library-staging to UX Library (production).

Steps:
1. Run the following rsync command to copy all files from staging to production, excluding .git and .DS_Store:
   rsync -av --delete --exclude='.git' --exclude='.DS_Store' /Users/faye.cheah/Documents/GitHub/ux-library-staging/ /Users/faye.cheah/Documents/GitHub/UX Library/

2. Go into the UX Library directory and check what changed:
   cd /Users/faye.cheah/Documents/GitHub/UX Library && git status && git diff --stat

3. Stage all changes:
   git add .

4. Ask the user for a commit message, or use a sensible default: "sync: promote staging to production"

5. Commit with the message provided (or default), appending the standard Co-Authored-By footer.

6. Push to origin main.

7. Report back: list of files changed, commit hash, and confirmation that push succeeded.
