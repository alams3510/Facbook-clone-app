export const loginStart=(userCredential)=>({
    type:"LOGIN_START"
})

export const loginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const loginFailure=(error)=>({
    type:"LOGIN_FAILED",
    payload:error
})

export const follow=(userId)=>({
    type:"FOLLOW",
    payload:userId
})

export const unfollow=(userId)=>({
    type:"UNFOLLOW",
    payload:userId
})
export const dataUpdated=(user)=>({
    type:"DETAILS_UPDATED",
    payload:user
})