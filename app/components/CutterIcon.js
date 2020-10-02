import React from "react";
import PropTypes from "prop-types";
import IconHome from "../assets/icons/home.svg";
import IconDelete from "../assets/icons/delete.svg";
import IconExport from "../assets/icons/export.svg";
import IconLogo from "../assets/icons/logo.png";
import IconPlus from "../assets/icons/plus.svg";
import IconStart from "../assets/icons/start.svg";
import IconStop from "../assets/icons/stop.svg";
import IconBtnExport from "../assets/icons/btn_export.svg";

const CutterIcon = ({ name, ...other }) => {
    var Icon = null;
    switch (name) {
        case "home":
            Icon = IconHome;
            break;
        case "export":
            Icon = IconExport;
            break;
        case "delete":
            Icon = IconDelete;
            break;
        case "logo":
            Icon = IconLogo;
            break;
        case "plus":
            Icon = IconPlus;
            break;
        case "start":
            Icon = IconStart;
            break;
        case "stop":
            Icon = IconStop;
            break;
        case "btn_export":
            Icon = IconBtnExport;
            break;
        default:
            return <div>{name}</div>;
    }

    return <img src={Icon} {...other} />;
};

CutterIcon.propTypes = {
    name: PropTypes.string,
};
export default CutterIcon;
