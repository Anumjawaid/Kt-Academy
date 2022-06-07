import {SocialMediaDefinition} from "../../src/Model";
import React from "react";

export function SocialMediaIcons({socialMedia}: { socialMedia: SocialMediaDefinition }) {
    return <div className="social-media-container">
        {socialMedia.github &&
        <a href={`https://github.com//${socialMedia.github}`}><i className="fab fa-github margin-5"/> </a>}
        {socialMedia.twitter &&
        <a href={`https://twitter.com/${socialMedia.twitter}`}><i className="fab fa-twitter margin-5"/> </a>}
        {socialMedia.linkedin &&
        <a href={`https://www.linkedin.com/in/${socialMedia.linkedin}`}><i className="fab fa-linkedin-in margin-5"/> </a>}
        {socialMedia.websiteUrl &&
        <a href={socialMedia.websiteUrl}><i className="fas fa-globe margin-5"/> </a>}
    </div>;
}