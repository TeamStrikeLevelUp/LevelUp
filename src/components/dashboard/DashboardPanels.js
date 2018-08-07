import React from 'react';

function DashboardPanels() {
    return (
        <div className="dashboard__panels">
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Points</h3>
                <div className="dashboard__panels--points">250</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Total Post</h3>
                <div className="dashboard__panels--points">1750</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Messages</h3>
                <div className="dashboard__panels--points">450</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Forum</h3>
                <div className="dashboard__panels--points">50</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Twitch</h3>
                <div className="dashboard__panels--points">340</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
            <div className="dashboard__panels--item">
                <h3 className="dashboard__panels--heading">Video Game</h3>
                <div className="dashboard__panels--points">20</div>
                <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
            </div>
        </div>
    )
}

export default DashboardPanels;