import {appActions, appSlice, AuthStateType} from '../appSlice';


let startState: AuthStateType

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
})

test("correct error message should be set", () => {
    const endState = appSlice(startState, appActions.setAppError({ error: "some error" }))

    expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
    const endState = appSlice(startState, appActions.setAppStatus({ status: "loading" }))

    expect(endState.status).toBe("loading")
})

test("correct status isDarkMode be set", () => {
    const endState = appSlice(startState, appActions.setAppInitialized({ isInitialized: true }))

    expect(endState.isInitialized).toBe(true)
})