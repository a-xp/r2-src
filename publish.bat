@echo off
cd www
rd /s /q .git
git init
git add .
git commit -m "release1"
git remote add origin https://github.com/a-xp/r2.git
git push -f origin master