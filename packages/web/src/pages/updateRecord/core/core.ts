import { TCommitList } from '@/api/todolist/base/updateRecord/type';

enum E_COMMIT_TYPE {
  其他更新,
  新功能,
  UI更新,
  Bug修复,
}

export function getCommitType(commitName: string) {
  const isFeature = commitName.includes('✨');
  if (isFeature) {
    return E_COMMIT_TYPE.新功能;
  }
  const isUI = commitName.includes('💄');
  if (isUI) {
    return E_COMMIT_TYPE.UI更新;
  }
  const isBugFix = commitName.includes('🐛');
  if (isBugFix) {
    return E_COMMIT_TYPE.Bug修复;
  }
  return E_COMMIT_TYPE.其他更新;
}

export function getChangeLog(commits: TCommitList) {
  const map = new Map<E_COMMIT_TYPE, Set<TCommitList['0']>>();
  commits.forEach((commit) => {
    const commitType = getCommitType(commit?.commit?.message);
    if (map.has(commitType)) {
      map.get(commitType)?.add(commit);
    } else {
      map.set(commitType, new Set<TCommitList['0']>().add(commit));
    }
  });

  const logMap = {
    '✨ new features': [...(map.get(E_COMMIT_TYPE.新功能)?.values() || [])],
    '💄 UI and style': [...(map.get(E_COMMIT_TYPE.UI更新)?.values() || [])],
    '🐛 Fix a bug': [...(map.get(E_COMMIT_TYPE.Bug修复)?.values() || [])],
    '📝 其他更新': [...(map.get(E_COMMIT_TYPE.其他更新)?.values() || [])],
  };
  return logMap;
}
