import { Component, ChangeEvent } from "react";
import MeetingDataService from "services/meeting.service";
import IMeetingData from "types/meeting.type";

type Props = {};

type State = IMeetingData & { submitted: boolean };

export default class AddMeeting extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.saveMeeting = this.saveMeeting.bind(this);
        this.newMeeting = this.newMeeting.bind(this);

        this.state = {
            id: null,
            title: "",
            capacity: "",
            active: false,
            submitted: false
        }
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ title: e.target.value });
    }

    onChangeCapacity(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ capacity: e.target.value ? e.target.value : "0" })
        // this.setState({capacity: e.target.value})
    }

    saveMeeting() {
        const data: IMeetingData = {
            title: this.state.title,
            capacity: this.state.capacity //
        };

        MeetingDataService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    capacity: response.data.capacity,
                    active: response.data.active,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    newMeeting() {
        this.setState({
            id: null,
            title: "",
            capacity: "",
            active: false,
            submitted: false
        });
    }

    render() {
        const { submitted, title, capacity } = this.state;

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newMeeting}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="text"
                                className="form-control"
                                id="capacity"
                                value={capacity}
                                onChange={this.onChangeCapacity}
                                name="capacity"
                            />
                        </div>
                        <button onClick={this.saveMeeting} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
