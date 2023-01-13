import { Component, ChangeEvent } from "react";
import MeetingDataService from "services/meeting.service";
import { Link } from "react-router-dom";
import IMeetingData from "types/meeting.type";

type Props = {};

type State = {
    meetings: Array<IMeetingData>,
    currentMeeting: IMeetingData | null,
    currentIndex: number,
    searchTitle: string
};

export default class MeetingsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveMeetings = this.retrieveMeetings.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMeeting = this.setActiveMeeting.bind(this);
        this.removeAllMeetings = this.removeAllMeetings.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            meetings: [],
            currentMeeting: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveMeetings();
    }

    onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveMeetings() {
        MeetingDataService.getAll()
            .then((response: any) => {
                this.setState({
                    meetings: response.data
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMeetings();
        this.setState({
            currentMeeting: null,
            currentIndex: -1
        });
    }

    setActiveMeeting(meeting: IMeetingData, index: number) {
        this.setState({
            currentMeeting: meeting,
            currentIndex: index
        });
    }

    removeAllMeetings() {
        MeetingDataService.deleteAll()
            .then((response: any) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e: Error) => {
                console.log(e);

            });
    }

    searchTitle() {
        this.setState({
            currentMeeting: null,
            currentIndex: -1
        });

        // call API to find from db
        MeetingDataService.findByTitle(this.state.searchTitle)
            .then((response: any) => {
                this.setState({
                    meetings: response.data
                })
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    render() {
        const { searchTitle, meetings, currentMeeting, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Meeting List</h4>

                    <ul className="list-group">
                        {meetings &&
                            meetings.map((meeting: IMeetingData, index: number) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveMeeting(meeting, index)}
                                    key={index}
                                >
                                    {meeting.title}
                                </li>
                            ))
                        }
                    </ul>

                    <button
                        className="btn btn-sm btn-danger m-3"
                        onClick={this.removeAllMeetings}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentMeeting ? (
                        <div>
                            <h4>Meeting</h4>
                            <div>
                                <label>
                                    <strong>Title: </strong>
                                </label>
                                {currentMeeting.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Capacity: </strong>
                                </label>
                                {currentMeeting.capacity}
                            </div>
                            <div>
                                <label>
                                    <strong>Status: </strong>
                                </label>
                                {currentMeeting.active ? "Active" : "Inactive"}
                            </div>

                            <Link
                                to={"/meetings/" + currentMeeting.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Plese click on some Meeting...</p>
                        </div>
                    )
                    }
                </div>
            </div>
        );
    }
}
