#!/usr/bin/env bash
set -eu
set -o pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"
cd "$root_dir"

# Start timing
start_time=$(date +%s%N)

total_count=0
success_count=0
failed_count=0
for test_dir in tests/*; do
    ((total_count+=1))
    echo "$test_dir"
    cd "$root_dir/$test_dir"
    bash -ex setup.bash
    set +e
    if npx --no tsx test.mts; then
        echo "Passed!"
        ((success_count+=1))
    else
        echo "Failed!"
        ((failed_count+=1))
    fi
    set -e
done

# Calculate elapsed time
end_time=$(date +%s%N)
elapsed_ns=$((end_time - start_time))

# Convert to appropriate unit
if [[ $elapsed_ns -lt 1000000 ]]; then
    # Less than 1ms, show in microseconds
    elapsed_us=$((elapsed_ns / 1000))
    time_str="${elapsed_us}μs"
elif [[ $elapsed_ns -lt 1000000000 ]]; then
    # Less than 1s, show in milliseconds
    elapsed_ms=$((elapsed_ns / 1000000))
    time_str="${elapsed_ms}ms"
else
    # Show in seconds with decimal
    elapsed_s=$((elapsed_ns / 1000000000))
    elapsed_ms_remainder=$(((elapsed_ns % 1000000000) / 1000000))
    time_str="${elapsed_s}.${elapsed_ms_remainder}s"
fi

summary="Total: $total_count | Success: $success_count | Failed: $failed_count | Time: $time_str"
if [[ $failed_count -gt 0 ]]; then
    echo "$summary" >&2
    exit 1
else
    echo "$summary"
fi