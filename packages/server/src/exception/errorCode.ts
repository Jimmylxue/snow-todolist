export enum ErrorCode {
  // 请求参数错误
  REQUEST_PARAMS_ERROR_CODE = 40000,
  // 权限错误
  NO_AUTH_ERROR_CODE = 30000,
  // 禁止访问
  FORBIDDEN_ERROR_CODE = 20000,
  // 系统错误
  SYSTEM_ERROR_CODE = 50000,
  // 找不到数据
  NOT_FOUND_ERROR_CODE = 40400,
  // 第三方服务错误
  THIRD_PART_SERVICE_ERROR_CODE = 50010,
}

export const ErrorMessage = {
  40000: '请求参数错误',
  30000: '权限错误',
  20000: '禁止访问',
  40400: '找不到数据',
  50010: '第三方服务错误',
};
