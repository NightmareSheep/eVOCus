using System;
using System.Collections.Generic;
using System.Linq;
using e.VOC.us.Game.GameModes;
using e.VOC.us.Game.GameModes.Survival;
using e.VOC.us.Models;
using FarseerPhysics;
using FarseerPhysics.Common;
using FarseerPhysics.Dynamics;
using FarseerPhysics.Factories;
using Microsoft.Xna.Framework;
using Newtonsoft.Json;

namespace e.VOC.us.Game
{
    public class GameState
    {
        [JsonIgnore] public Guid Id = Guid.NewGuid();
        [JsonIgnore]
        public readonly Dictionary<string,Player> PlayerDictionary = new Dictionary<string, Player>();
        [JsonProperty("players")]
        public List<Player> Players = new List<Player>();
        [JsonProperty("explosions")]
        public List<Vector2D> Explosions = new List<Vector2D>();
        [JsonProperty("map")]
        public Map Map;
        [JsonIgnore]
        private readonly IShipFactory _shipFactory = new NormalShipFactory();
        [JsonIgnore]
        public IShipFactory ShipFactory => _shipFactory;
        [JsonProperty("gameObjects")]
        public List<GameObject> GameObjects = new List<GameObject>();
        [JsonProperty("gameTime")] public long GameTime;
        [JsonIgnore] private readonly IGameMode _gameMode;
        [JsonIgnore] public List<GameObject> RemoveList = new List<GameObject>();
        [JsonIgnore] public World World;

        public event ConnectEventHandler PlayerConnectEvent;
        public event ConnectEventHandler PlayerDisconnectEvent;

        public GameState(Map map, List<Slot> slots)
        {
            Map = map;
            var startpositions = map.StartLocations.ToList();
            for (int i = 0; i < slots.Count; i++)
            {
                var slot = slots[i];
                var startPosition = startpositions[i];
                if (slot.LobbyPlayer != null)
                {
                    var player = new Player(startPosition, slot.LobbyPlayer.Id.ToString(), slot.LobbyPlayer.Name, slot.Team);
                    Players.Add(player);
                    PlayerDictionary.Add(slot.LobbyPlayer.Id.ToString(), player);
                }
            }
            _gameMode = new Survival(3, Players, this);
            ResetWorld();
            
        }

        public void Update(GameTime gametime)
        {
            GameTime = gametime.ElapsedMilliseconds;
            Explosions.Clear();

            for (int i = GameObjects.Count - 1; i >= 0; i--)
                GameObjects[i].Update(gametime);

            foreach (var player in Players)
                player.Update(gametime);

            _gameMode.Update();

            GameObjects = GameObjects.Except(RemoveList).ToList();
            RemoveList.Clear();

            World.Step(0.064f);
        }

        public void PlayerConnect(string connectionId, string playerId)
        {
            var connectEventArgs = new ConnectEventArgs
            {
                ConnectionId = connectionId,
                PlayerId = playerId
            };
            PlayerConnectEvent?.Invoke(this, connectEventArgs);
        }

        public void PlayerDisconnect(string connectionId, string playerId)
        {
            var connectEventArgs = new ConnectEventArgs
            {
                ConnectionId = connectionId,
                PlayerId = playerId
            };
            PlayerDisconnectEvent?.Invoke(this, connectEventArgs);
        }

        public void ResetWorld()
        {
            World = new World(Vector2.Zero);
            Vector2[] vertices =
            {
                new Vector2(0,0),
                new Vector2(ConvertUnits.ToSimUnits(Map.Width), 0),
                new Vector2(ConvertUnits.ToSimUnits(Map.Width), ConvertUnits.ToSimUnits(Map.Height)),
                new Vector2(0, ConvertUnits.ToSimUnits(Map.Height)),
                new Vector2(0,0),
            };

            BodyFactory.CreateChainShape(World, new Vertices(vertices), new Vector2(0, 0));
        }
    }
}