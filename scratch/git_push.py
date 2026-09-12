import subprocess

def push_git():
    res = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
    print("STDOUT:", res.stdout)
    print("STDERR:", res.stderr)
    print("EXIT:", res.returncode)

if __name__ == "__main__":
    push_git()
