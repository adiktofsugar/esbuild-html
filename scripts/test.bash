#!/usr/bin/env bash
set -eu
set -o pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd .. && pwd)"
cd "$root_dir"

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
summary="Total: $total_count | Success: $success_count | Failed: $failed_count"
if [[ $failed_count -gt 0 ]]; then
    echo "$summary" >&2
    exit 1
else
    echo "$summary"
fi