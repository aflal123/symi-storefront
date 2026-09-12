import os
import sys
import subprocess
import imageio_ffmpeg

def main():
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    print(f"Using FFmpeg binary: {ffmpeg_exe}")

    input_path = "public/videos/hero.mp4"
    temp_output_path = "public/videos/hero_landscape_hd.mp4"

    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        sys.exit(1)

    print(f"Processing {input_path} -> {temp_output_path}...")

    # FFmpeg command:
    # transpose=2 -> 90 degrees counterclockwise rotation (portrait -> landscape)
    # scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080 -> crisp 1080p 16:9 landscape fill
    # unsharp=5:5:0.8:5:5:0.0 -> HD detail sharpening
    # -crf 18 -> visually lossless high quality
    # -preset slow -> optimal H.264 compression & visual clarity

    filter_complex = "transpose=2,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,unsharp=5:5:0.8:5:5:0.0"

    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", input_path,
        "-vf", filter_complex,
        "-c:v", "libx264",
        "-crf", "18",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an", # remove audio track for fast background web streaming
        temp_output_path
    ]

    print("Running FFmpeg command:")
    print(" ".join(cmd))

    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    if res.returncode != 0:
        print("FFmpeg Error:")
        print(res.stderr)
        sys.exit(1)

    print(f"Successfully generated {temp_output_path}!")
    
    # Overwrite hero.mp4 with the new enhanced landscape version
    os.replace(temp_output_path, input_path)
    print(f"Replaced {input_path} with high quality landscape video!")

if __name__ == "__main__":
    main()
