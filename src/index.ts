import { Toolkit } from 'actions-toolkit';

Toolkit.run(async tool => {
    const pr = await tool.github.pulls.get(tool.context.pullRequest)
    const labels_wip = pr.data.labels.filter(label => label.name === 'WIP');
    if (labels_wip.length) {
        await tool.github.repos.createCommitStatus(
            {
                sha: pr.data.merge_commit_sha,
                state: 'pending',
                owner: tool.context.pullRequest.owner,
                repo: tool.context.pullRequest.repo
            }
        )
    } else{
        await tool.github.repos.createCommitStatus(
            {
                sha: pr.data.merge_commit_sha,
                state: 'success',
                owner: tool.context.pullRequest.owner,
                repo: tool.context.pullRequest.repo
            }
        )
    }
});
