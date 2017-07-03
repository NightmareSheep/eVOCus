using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Channels;
using e.VOC.us.Game.DelegatesAndEventArgs;
using e.VOC.us.Game.GameObjects;

namespace e.VOC.us.Game.GameModes.Survival
{
    public class Survival : IGameMode
    {
        public readonly int RoundsToWin;
        private readonly List<SurvivalTeam> _teams;
        public List<SurvivalTeam> Teams => _teams;
        private readonly GameState _game;
        private readonly List<SurvivalPlayer> _players;
        public int Round { get; private set; }
        private bool _gameHasEnded;


        public Survival(int roundsToWin, List<Player> players, GameState gameState)
        {
            _game = gameState;
            RoundsToWin = roundsToWin;
            var teamNumbers = players.Select(player => player.Team).Distinct().ToArray();
            _teams = teamNumbers.Select(teamNumber => new SurvivalTeam(players.Where(player => player.Team == teamNumber))).ToList();
            _players = _teams.SelectMany(team => team.Players).ToList();
            _game.GameObjects.Add(new Message("Waiting for players...", 5000, RoundIntro, _game));
            _game.GameObjects.Add(new SurvivalScoreBoard(this));
        }

        private IEnumerable<SurvivalTeam> RemainingTeams => _teams.Where(team => team.AnyPlayersAlive);

        public void Update()
        {
            if (_gameHasEnded)
                return;

            var reamingTeams = RemainingTeams.ToList();
            if (reamingTeams.Count == 1)
                reamingTeams[0].Score++;
            if (reamingTeams.Count <= 1)
                RoundEnd();
        }

        private void RoundEnd()
        {
            if (_teams.Any(team => team.Score >= RoundsToWin))
                FinishGame();
            else
                RoundIntro();
        }

        private void RoundIntro()
        {
            _game.RemoveList.AddRange(_game.GameObjects.Where(x => x is Ship));
            _players.ForEach(player => player.Alive = true);
            foreach (var player in _game.Players)
                _game.GameObjects.Add(_game.ShipFactory.FakeShip(ShipTypes.Frigate, player.StartLocation.StartPosition, player.StartLocation.Angle, player, _game));
            _game.GameObjects.Add(new CountDown("Round starts in {0}", 5000, RoundStart, _game));
        }

        private void RoundStart()
        {
            Round++;
            _game.ResetWorld();
            _game.RemoveList.AddRange(_game.GameObjects.Where(x => x is FakeShip));
            var players = _players.ToList();
            foreach (var survivalPlayer in _teams.SelectMany(team => team.Players).ToList())
            {
                var ship = _game.ShipFactory.Ship(ShipTypes.Frigate, survivalPlayer.Player.StartLocation.StartPosition, survivalPlayer.Player.StartLocation.Angle, survivalPlayer.Player, _game);
                ship.DeathRattle = () =>
                {
                    survivalPlayer.Alive = false;
                    survivalPlayer.Deaths++;
                };
                ship.IsHit += (Ship sender, ShipIsHitEventArgs e) =>
                {
                    var firstOrDefault = players.FirstOrDefault(x => x.Player == e.Source);
                    if (firstOrDefault != null)
                        firstOrDefault.Kills++;
                };
                _game.GameObjects.Add(ship);
            }
        }

        private void FinishGame()
        {
            _game.RemoveList.AddRange(_game.GameObjects.Where(x => x is Ship));
            _game.GameObjects.Add(new Message("Game over", 60000, null, _game));
            _gameHasEnded = true;
        }
    }
}