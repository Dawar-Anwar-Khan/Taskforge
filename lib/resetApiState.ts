import { tasksApi } from './tasksApi'
import { employeesApi } from './employeesApi'
import { meApi } from './meApi'
import type { AppDispatch } from './store'

export function resetAllApiState(dispatch: AppDispatch) {
  dispatch(tasksApi.util.resetApiState())
  dispatch(employeesApi.util.resetApiState())
  dispatch(meApi.util.resetApiState())
}

