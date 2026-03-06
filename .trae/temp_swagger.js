
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/taskType/list": {
        "post": {
          "operationId": "TaskTypeController_getUserType",
          "parameters": [],
          "responses": {
            "default": {
              "description": "任务类型列表返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskTypeResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "查看任务类型列表",
          "tags": [
            "待办事项-任务类型"
          ]
        }
      },
      "/taskType/detail": {
        "post": {
          "operationId": "TaskTypeController_getTypeDetail",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DetailTypeParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "任务类型详情返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskType"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "查看任务类型详情",
          "tags": [
            "待办事项-任务类型"
          ]
        }
      },
      "/taskType/add": {
        "post": {
          "operationId": "TaskTypeController_addUserType",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddUserTypeParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "添加任务类型返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "添加任务类型",
          "tags": [
            "待办事项-任务类型"
          ]
        }
      },
      "/taskType/del": {
        "post": {
          "operationId": "TaskTypeController_delType",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DelTypeParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "删除任务类型返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "删除任务类型",
          "tags": [
            "待办事项-任务类型"
          ]
        }
      },
      "/taskType/update": {
        "post": {
          "operationId": "TaskTypeController_updateTask",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTypeParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "更新任务类型返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "更新任务类型",
          "tags": [
            "待办事项-任务类型"
          ]
        }
      },
      "/task/list": {
        "post": {
          "operationId": "TaskController_getUserType",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserTaskParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "任务列表返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "查看任务列表",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/detail": {
        "post": {
          "operationId": "TaskController_getTypeDetail",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DetailParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "任务详情返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskDetailResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "查看任务详情",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/add": {
        "post": {
          "operationId": "TaskController_addUserType",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddTaskParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "添加任务返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "添加任务",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/del": {
        "post": {
          "operationId": "TaskController_delType",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DelParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "删除任务返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "删除任务",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/updateStatus": {
        "post": {
          "operationId": "TaskController_updateTaskStatus",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTaskStatusParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "更新任务状态返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "更新任务状态",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/update": {
        "post": {
          "operationId": "TaskController_updateTask",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTaskParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "更新任务信息返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/BaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "更新任务信息",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/task/search": {
        "post": {
          "operationId": "TaskController_getSearchTask",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SearchParams"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "任务列表返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskSearchResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "搜索任务",
          "tags": [
            "待办事项-任务"
          ]
        }
      },
      "/base/UpdateRecord": {
        "post": {
          "operationId": "BaseController_getTodoListUpdateRecord",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GetCommitDto"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "更新记录返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TaskBaseResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "查看更新记录",
          "tags": [
            "待办事项-基础"
          ]
        }
      },
      "/todo-notice/setting/get": {
        "post": {
          "operationId": "NoticeController_getSetting",
          "parameters": [],
          "responses": {
            "default": {
              "description": "通知设置返回",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SettingResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "获取用户通知设置",
          "tags": [
            "待办通知"
          ]
        }
      },
      "/todo-notice/setting/update": {
        "post": {
          "operationId": "NoticeController_updateSetting",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSettingDto"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "是否成功",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UpdateSettingResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "更新用户通知设置",
          "tags": [
            "待办通知"
          ]
        }
      },
      "/todo-notice/admin/trigger": {
        "post": {
          "operationId": "NoticeController_trigger",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdminTriggerDto"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "触发结果",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdminTriggerResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "管理员手动触发今日通知",
          "tags": [
            "待办通知"
          ]
        }
      },
      "/todo-notice/admin/records": {
        "post": {
          "operationId": "NoticeController_records",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RecordsListDto"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "记录列表",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RecordsListResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "管理员查询通知记录",
          "tags": [
            "待办通知"
          ]
        }
      },
      "/todo-notice/admin/runs": {
        "post": {
          "operationId": "NoticeController_runs",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RunsListDto"
                }
              }
            }
          },
          "responses": {
            "default": {
              "description": "运行记录",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RunsListResponseDto"
                  }
                }
              }
            }
          },
          "security": [
            {
              "access-token": []
            }
          ],
          "summary": "管理员查询通知运行记录",
          "tags": [
            "待办通知"
          ]
        }
      }
    },
    "info": {
      "title": "To Do List API",
      "description": "待办事项 接口",
      "version": "1.0",
      "contact": {
        "name": "Jimmylxue",
        "url": "https://github.com/Jimmylxue",
        "email": "1002661758@qq.com"
      }
    },
    "tags": [],
    "servers": [],
    "components": {
      "securitySchemes": {
        "access-token": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "TaskType": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            },
            "userId": {
              "type": "number"
            },
            "typeName": {
              "type": "string"
            },
            "desc": {
              "type": "string"
            },
            "createTime": {
              "type": "string"
            },
            "updateTime": {
              "type": "string"
            },
            "themeColor": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            }
          },
          "required": [
            "typeId",
            "userId",
            "typeName",
            "desc",
            "createTime",
            "updateTime",
            "themeColor",
            "icon"
          ]
        },
        "TaskTypeResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "type": "object",
              "properties": {
                "page": {
                  "type": "number"
                },
                "total": {
                  "type": "number"
                },
                "result": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TaskType"
                  }
                }
              },
              "required": [
                "page",
                "total",
                "result"
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "DetailTypeParams": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            }
          },
          "required": [
            "typeId"
          ]
        },
        "AddUserTypeParams": {
          "type": "object",
          "properties": {
            "typeName": {
              "type": "string"
            },
            "desc": {
              "type": "string"
            },
            "themeColor": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            }
          },
          "required": [
            "typeName",
            "desc",
            "themeColor",
            "icon"
          ]
        },
        "BaseResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            }
          },
          "required": [
            "code",
            "message"
          ]
        },
        "DelTypeParams": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            }
          },
          "required": [
            "typeId"
          ]
        },
        "UpdateTypeParams": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            },
            "typeName": {
              "type": "string"
            },
            "desc": {
              "type": "string"
            },
            "themeColor": {
              "type": "string"
            },
            "icon": {
              "type": "string"
            }
          },
          "required": [
            "typeId",
            "typeName",
            "desc",
            "themeColor",
            "icon"
          ]
        },
        "UserTaskParams": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            },
            "pageSize": {
              "type": "number"
            },
            "page": {
              "type": "number"
            },
            "startTime": {
              "type": "number"
            },
            "endTime": {
              "type": "number"
            },
            "status": {
              "type": "number"
            },
            "sort": {
              "type": "string"
            },
            "filterType": {
              "type": "number",
              "enum": [
                1,
                2
              ]
            }
          },
          "required": [
            "typeId",
            "pageSize",
            "page",
            "startTime",
            "endTime",
            "status",
            "sort",
            "filterType"
          ]
        },
        "Task": {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "number"
            },
            "typeId": {
              "type": "number"
            },
            "userId": {
              "type": "number"
            },
            "status": {
              "type": "number"
            },
            "taskName": {
              "type": "string"
            },
            "taskContent": {
              "type": "string"
            },
            "createTime": {
              "type": "string"
            },
            "completeTime": {
              "type": "string"
            },
            "updateTime": {
              "type": "string"
            },
            "expectTime": {
              "type": "string"
            }
          },
          "required": [
            "taskId",
            "typeId",
            "userId",
            "status",
            "taskName",
            "taskContent",
            "createTime",
            "completeTime",
            "updateTime",
            "expectTime"
          ]
        },
        "TaskResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "type": "object",
              "properties": {
                "page": {
                  "type": "number"
                },
                "total": {
                  "type": "number"
                },
                "result": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Task"
                  }
                }
              },
              "required": [
                "page",
                "total",
                "result"
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "DetailParams": {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "number"
            }
          },
          "required": [
            "taskId"
          ]
        },
        "TaskDetailResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "任务详情",
              "allOf": [
                {
                  "$ref": "#/components/schemas/Task"
                }
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "AddTaskParams": {
          "type": "object",
          "properties": {
            "typeId": {
              "type": "number"
            },
            "taskName": {
              "type": "string"
            },
            "taskContent": {
              "type": "string"
            },
            "expectTime": {
              "type": "string"
            }
          },
          "required": [
            "typeId",
            "taskName",
            "taskContent",
            "expectTime"
          ]
        },
        "DelParams": {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "number"
            }
          },
          "required": [
            "taskId"
          ]
        },
        "UpdateTaskStatusParams": {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "number"
            },
            "status": {
              "type": "number"
            }
          },
          "required": [
            "taskId",
            "status"
          ]
        },
        "UpdateTaskParams": {
          "type": "object",
          "properties": {
            "taskId": {
              "type": "number"
            },
            "typeId": {
              "type": "number"
            },
            "taskName": {
              "type": "string"
            },
            "taskContent": {
              "type": "string"
            },
            "expectTime": {
              "type": "string"
            }
          },
          "required": [
            "taskId",
            "typeId",
            "taskName",
            "taskContent",
            "expectTime"
          ]
        },
        "SearchParams": {
          "type": "object",
          "properties": {
            "taskName": {
              "type": "string"
            }
          },
          "required": [
            "taskName"
          ]
        },
        "TaskSearchResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "type": "object",
              "properties": {
                "total": {
                  "type": "number"
                },
                "result": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Task"
                  }
                }
              },
              "required": [
                "total",
                "result"
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "GetCommitDto": {
          "type": "object",
          "properties": {
            "user": {
              "type": "string"
            },
            "repos": {
              "type": "string"
            },
            "branch": {
              "type": "string"
            },
            "startTime": {
              "type": "string"
            }
          },
          "required": [
            "user",
            "repos",
            "branch",
            "startTime"
          ]
        },
        "TaskBaseResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "列表集合",
              "example": [],
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "SettingPayload": {
          "type": "object",
          "properties": {
            "emailEnabled": {
              "type": "boolean",
              "description": "是否开启邮件通知"
            },
            "letterEnabled": {
              "type": "boolean",
              "description": "是否开启站内信通知"
            },
            "preferredTime": {
              "type": "string",
              "description": "通知时间(HH:mm)"
            }
          },
          "required": [
            "emailEnabled",
            "letterEnabled",
            "preferredTime"
          ]
        },
        "SettingResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "返回内容",
              "allOf": [
                {
                  "$ref": "#/components/schemas/SettingPayload"
                }
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "UpdateSettingDto": {
          "type": "object",
          "properties": {
            "emailEnabled": {
              "type": "boolean",
              "description": "是否开启邮件通知"
            },
            "letterEnabled": {
              "type": "boolean",
              "description": "是否开启站内信通知"
            },
            "preferredTime": {
              "type": "string",
              "description": "通知时间(HH:mm)，24小时制，步长30分钟",
              "example": "08:30"
            }
          }
        },
        "UpdateSettingResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "type": "boolean",
              "description": "是否成功"
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "AdminTriggerDto": {
          "type": "object",
          "properties": {
            "date": {
              "type": "string",
              "description": "目标日期(YYYY-MM-DD)"
            },
            "userId": {
              "type": "number",
              "description": "仅对指定用户触发"
            },
            "channel": {
              "enum": [
                "email",
                "letter",
                "both"
              ],
              "type": "string",
              "description": "触发渠道"
            }
          }
        },
        "AdminTriggerPayload": {
          "type": "object",
          "properties": {
            "runId": {
              "type": "number",
              "description": "运行ID"
            },
            "runAt": {
              "format": "date-time",
              "type": "string",
              "description": "触发时间"
            },
            "sentCount": {
              "type": "number",
              "description": "发送条数"
            }
          },
          "required": [
            "runId",
            "runAt",
            "sentCount"
          ]
        },
        "AdminTriggerResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "返回内容",
              "allOf": [
                {
                  "$ref": "#/components/schemas/AdminTriggerPayload"
                }
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "RecordsListDto": {
          "type": "object",
          "properties": {
            "page": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            },
            "date": {
              "type": "string"
            },
            "userId": {
              "type": "number"
            },
            "status": {
              "enum": [
                "success",
                "failed"
              ],
              "type": "string"
            },
            "channel": {
              "enum": [
                "email",
                "letter"
              ],
              "type": "string"
            }
          }
        },
        "RecordsListPayload": {
          "type": "object",
          "properties": {
            "page": {
              "type": "number",
              "description": "当前页码"
            },
            "result": {
              "description": "列表",
              "type": "array",
              "items": {
                "type": "object"
              }
            },
            "total": {
              "type": "number",
              "description": "总数"
            }
          },
          "required": [
            "page",
            "result",
            "total"
          ]
        },
        "RecordsListResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "返回内容",
              "allOf": [
                {
                  "$ref": "#/components/schemas/RecordsListPayload"
                }
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        },
        "RunsListDto": {
          "type": "object",
          "properties": {
            "page": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            }
          }
        },
        "Word": {
          "type": "object",
          "properties": {
            "wordId": {
              "type": "number"
            },
            "word": {
              "type": "string"
            },
            "chineseMean": {
              "type": "string"
            },
            "createTime": {
              "format": "date-time",
              "type": "string"
            },
            "updateTime": {
              "format": "date-time",
              "type": "string"
            },
            "userWords": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/UserWord"
              }
            }
          },
          "required": [
            "wordId",
            "word",
            "chineseMean",
            "createTime",
            "updateTime",
            "userWords"
          ]
        },
        "UserWord": {
          "type": "object",
          "properties": {
            "userWordId": {
              "type": "number"
            },
            "user": {
              "$ref": "#/components/schemas/User"
            },
            "userId": {
              "type": "number"
            },
            "word": {
              "$ref": "#/components/schemas/Word"
            },
            "wordId": {
              "type": "number"
            },
            "personalNote": {
              "type": "string"
            },
            "isMastered": {
              "type": "boolean"
            },
            "createTime": {
              "format": "date-time",
              "type": "string"
            },
            "updateTime": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "userWordId",
            "user",
            "userId",
            "word",
            "wordId",
            "personalNote",
            "isMastered",
            "createTime",
            "updateTime"
          ]
        },
        "Tag": {
          "type": "object",
          "properties": {
            "tagId": {
              "type": "number"
            },
            "tagName": {
              "type": "string"
            },
            "user": {
              "$ref": "#/components/schemas/User"
            },
            "userId": {
              "type": "number"
            },
            "createTime": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "tagId",
            "tagName",
            "user",
            "userId",
            "createTime"
          ]
        },
        "User": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "openid": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "wx_name": {
              "type": "string"
            },
            "nickname": {
              "type": "string"
            },
            "avatar": {
              "type": "string"
            },
            "role": {
              "type": "number"
            },
            "level": {
              "type": "number"
            },
            "sex": {
              "type": "number"
            },
            "phone": {
              "type": "string"
            },
            "mail": {
              "type": "string",
              "description": "邮箱地址"
            },
            "coin": {
              "type": "number"
            },
            "password": {
              "type": "string"
            },
            "inviter": {
              "type": "number"
            },
            "loginStatus": {
              "type": "number"
            },
            "last_active": {
              "format": "date-time",
              "type": "string"
            },
            "createTime": {
              "format": "date-time",
              "type": "string"
            },
            "updateTime": {
              "format": "date-time",
              "type": "string"
            },
            "userWords": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/UserWord"
              }
            },
            "tags": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Tag"
              }
            }
          },
          "required": [
            "id",
            "openid",
            "username",
            "wx_name",
            "nickname",
            "avatar",
            "role",
            "level",
            "sex",
            "phone",
            "mail",
            "coin",
            "password",
            "inviter",
            "loginStatus",
            "last_active",
            "createTime",
            "updateTime",
            "userWords",
            "tags"
          ]
        },
        "NoticeRun": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "runAt": {
              "format": "date-time",
              "type": "string"
            },
            "triggeredBy": {
              "type": "string",
              "enum": [
                "system",
                "admin"
              ]
            },
            "operator": {
              "$ref": "#/components/schemas/User"
            },
            "operatorId": {
              "type": "number",
              "nullable": true
            },
            "sentCount": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            }
          },
          "required": [
            "id",
            "runAt",
            "triggeredBy",
            "operator",
            "operatorId",
            "sentCount",
            "createdAt"
          ]
        },
        "RunsListPayload": {
          "type": "object",
          "properties": {
            "page": {
              "type": "number",
              "description": "当前页码"
            },
            "result": {
              "description": "运行记录",
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/NoticeRun"
              }
            },
            "total": {
              "type": "number",
              "description": "总数"
            }
          },
          "required": [
            "page",
            "result",
            "total"
          ]
        },
        "RunsListResponseDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "number",
              "description": "业务状态码",
              "example": 200
            },
            "message": {
              "type": "string",
              "description": "业务消息",
              "example": "操作成功"
            },
            "result": {
              "description": "返回内容",
              "allOf": [
                {
                  "$ref": "#/components/schemas/RunsListPayload"
                }
              ]
            }
          },
          "required": [
            "code",
            "message",
            "result"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
