 #!/bin/bash

# Get the commit message from the command line argument
if [ -z "$1" ]
then
    echo "Please provide a commit message"
    echo "Usage: ./push.sh 'your commit message'"
    exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to main branch
git push origin main

echo "Changes pushed successfully!"