using System.Collections.Generic;
using Newtonsoft.Json;

namespace e.VOC.us.Game.GameModes.Survival
{
    public class SurvivalScoreBoard : GameObject
    {
        [JsonIgnore] private readonly Survival _survival;
        [JsonProperty("messages")] public List<string> Messages { get; set; } = new List<string>();

        public SurvivalScoreBoard(Survival survival)
        {
            _survival = survival;
            TypeId = "survival scoreboard";
        }
        
        public override void Update(GameTime gametime)
        {
            Messages.Clear();
            Messages.Add("Mode: Team survival");
            Messages.Add("Rounds to win: " + _survival.RoundsToWin);
            Messages.Add("");
            Messages.Add("Round: " + _survival.Round);
            Messages.Add("");
            for (int i = 0; i < _survival.Teams.Count; i++)
            {
                var team = _survival.Teams[i];
                Messages.Add("Team " + i + ", points: " + team.Score);
                Messages.Add("PlayerName    kills - deaths");
                Messages.Add("");
                foreach (var survivalPlayer in team.Players)
                {
                    Messages.Add(survivalPlayer.Player.Name + " " + survivalPlayer.Kills + "-" + survivalPlayer.Deaths);
                }
            }
            
        }
    }
}