export default function userId2ImagePath(userId: number, meId: number) {
  if (userId === meId) {
    return "/img/dots/character/character_kishi_man_01_red_black.svg";
  }
  if (userId >= 3) {
    return "/img/dots/character/character_monster_zombie_brown.svg";
  }
  return "/img/dots/character/character_madoshi_01_purple.svg";
}
