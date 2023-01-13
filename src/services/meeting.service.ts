import http from "../http-common";
import IMeetingData from "../types/meeting.type";

class MeetingDataService {
    getAll() {
        return http.get<Array<IMeetingData>>("/meetings")
    }

    get(id: string) {
        return http.get<IMeetingData>(`/meetings/${id}`)
    }

    create(data: IMeetingData) {
        return http.post<IMeetingData>("/meetings", data)
    }

    update(data: IMeetingData, id: any) {
        return http.put<any>(`/meetings/${id}`, data)
    }

    delete(id: any) {
        return http.delete<any>(`/meetings/${id}`)
    }

    deleteAll() {
        return http.delete<any>("/meetings")
    }

    findByTitle(title: string) {
        return http.get<Array<IMeetingData>>(`/meetings?title=${title}`)
    }
}

export default new MeetingDataService();