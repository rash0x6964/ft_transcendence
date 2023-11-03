import React, { useContext, useEffect, useState } from "react";
import PlayerName from "./PlayerName";
import PlayerCoins from "./PlayerCoins";
import NavHistory from "./NavHistory";
import PlayerRP from "./PlayerRP";
import Logo from "../svgs/Logo";
import SettingsButton from "./SettingsButton";
import PlayerLevel from "./PlayerLevel";
import profileService from "@/services/ProfileService";
import matchService from "@/services/MatchService";
import Match from "@/models/Match.model";
import Link from "next/link";
import ProfileData from "@/models/ProfileData.model";
import { ProfileContext } from "@/UI/ActiveUserProvider";
type Props = {
  coins: number;
  className: string;
};

export default function MainNavBar({ coins, className }: Props) {
  const { profileData, setProfileData } = useContext(ProfileContext);
  const [latestMatches, setLatestMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const _profileData = await profileService.getCurrentProfileData();

        setProfileData(_profileData);
      } catch (error) {
        console.log("Couldn't fetch profile data");
      }
    };

    const fetchLatestMatches = async () => {
      const _matches = await matchService.getLatestMatches(5);
      setLatestMatches(_matches);
    };

    fetchProfileData();
    fetchLatestMatches();
  }, []);

  if (!profileData)
    return <span className="loader mx-auto scale-50 my-3"></span>;
  else
    return (
      <div className={` flex justify-between py-3 px-7 mb-4 ${className}`}>
        <Link href="/">
          <Logo width={24} height={24} className="text-primary my-auto" />
        </Link>
        <div className="bg-transparent-500  flex justify-center flex-row-reverse  h-fit gap-12">
          <Link href={`/game/profile/${profileData.username}`}>
            <PlayerName
              src={profileData.avatarUrl}
              name={profileData.username}
            />
          </Link>
          <PlayerCoins className="my-auto" coins={profileData.profile.coins} />
          <NavHistory
            className="my-auto"
            matches={latestMatches}
            id={profileData.id}
          />
          <PlayerLevel
            className="my-auto"
            level={profileData.profile.level}
            percentage={profileService.calculatePercentage(profileData)}
          />
          <PlayerRP className="my-auto" RP={profileData.profile.rating} />
        </div>
        <SettingsButton className="my-auto text-white hover:text-white/50 duration-500" />
      </div>
    );
}
