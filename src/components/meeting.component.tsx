import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import MeetingDataService from "services/meeting.service";
import IMeetingData from "types/meeting.type";

interface RouterProps {
    id: string
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentMeeting: IMeetingData,
    message: string
}

export default class Meeting extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCapacity = this.onChangeCapacity.bind(this);
        this.getMeeting = this.getMeeting.bind(this);
        this.updateActive = this.updateActive.bind(this);
        this.updateMeeting = this.updateMeeting.bind(this);
        this.deleteMeeting = this.deleteMeeting.bind(this);

        this.state = {
            currentMeeting: {
                id: null,
                title: "",
                capacity: "",
                active: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getMeeting(this.props.match.params.id);
    }

    onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;

        this.setState((prevState) => ({
            currentMeeting: {
                ...prevState.currentMeeting,
                title: title
            }
        }));
    }

    onChangeCapacity(e: ChangeEvent<HTMLInputElement>) {
        const capacity = e.target.value;

        this.setState((prevState) => ({
            currentMeeting: {
                ...prevState.currentMeeting,
                capacity: capacity
            }
        }));
    }

    getMeeting(id: string) {
        MeetingDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentMeeting: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateActive(status: boolean) {
        const data: IMeetingData = {
            id: this.state.currentMeeting.id,
            title: this.state.currentMeeting.title,
            capacity: this.state.currentMeeting.capacity,
            active: status
        };

        MeetingDataService.update(data, this.state.currentMeeting.id)
            .then((response: any) => {
                this.setState((prevState) => ({
                    currentMeeting: {
                        ...prevState.currentMeeting,
                        active: status
                    },
                    message: "The status was updated successfully!"
                }));
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateMeeting() {
        MeetingDataService.update(this.state.currentMeeting, this.state.currentMeeting.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The meeting was updated successfully!"
                })
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteMeeting() {
        MeetingDataService.delete(this.state.currentMeeting.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/meetings");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentMeeting } = this.state;

        return (
            <div>
                {currentMeeting ? (
                    <div className="edit-form">
                        <h4>Meeting</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentMeeting.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="capacity"
                                    value={currentMeeting.capacity}
                                    onChange={this.onChangeCapacity}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Status: </strong>
                                    {currentMeeting.active ? "Active" : "Inactiv"}
                                </label>
                            </div>
                        </form>

                        {currentMeeting.active ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateActive(false)}
                            >
                                Deactivate
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateActive(true)}
                            >
                                Activate
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteMeeting}
                        >
                            Delete
                        </button>

                        <button
                            className="badge badge-success"
                            onClick={this.updateMeeting}
                            type="submit"
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on some Meeting...</p>
                    </div>
                )}
            </div>
        );
    }
}