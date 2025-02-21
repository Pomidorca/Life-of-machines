import http from '../http-common.js'

export default {
    getMashineClasses() {
        return http.get(`/data/machine-classes`);
    },
    getMashineMarks(classType) {
        console.log(classType); 

        return http.get(`/data/machine-marks/`, {
            params: {
                classId: classType
            }
        });
    },
}