const getSchool = (state = "", action) => {
    switch (action.type) {
        case "CHANGE_SCHOOL": 
            return action.school;

        default:
            return state;
    }
}

export default getSchool;