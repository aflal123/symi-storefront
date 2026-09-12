import subprocess

def run_git():
    subprocess.run(["rm", "-f", ".git/index.lock"], check=False)
    res1 = subprocess.run(["git", "add", "src/components/store/site-header.tsx", "src/components/admin/admin-portal.tsx"], capture_output=True, text=True)
    print("ADD:", res1.stdout, res1.stderr)
    res2 = subprocess.run(["git", "commit", "-m", "feat: adjust navbar container width and expand in-place Admin Portal features"], capture_output=True, text=True)
    print("COMMIT:", res2.stdout, res2.stderr)

if __name__ == "__main__":
    run_git()
