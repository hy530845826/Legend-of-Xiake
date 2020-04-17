var mission = new CreateMission();

import mission_data from './data/mission_data.json'
var MissionData = mission_data
var MissionOptions

function CreateMission() {
    this.UID = 0
    this.name = 'null'

    this.style = 0
    this.target_UID = 0
    this.target_num = 0
}

function UpdateMission(uid) {
    window.console.log("uid" + uid)
    if (uid == undefined) {
        window.console.log('no-mission')
        return 0
    }
    MissionOptions = MissionData[uid]
    let datamsg = MissionOptions[0]
    for (let index in mission) {
        mission[index] = datamsg[index]
    }

}

export default {
    mission, UpdateMission
}