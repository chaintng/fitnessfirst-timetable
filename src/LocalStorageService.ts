function getFavouriteClubs(): Array<string> {
  const clubsString = localStorage.getItem('clubs');
  return clubsString ? JSON.parse(clubsString) : [];
}

function toggleFavouriteClub(club: string) {
  const favouriteClubs = getFavouriteClubs();
  const clubIndex = favouriteClubs.indexOf(club);
  if (clubIndex >= 0) {
    favouriteClubs.splice(clubIndex, 1);
  } else {
    favouriteClubs.push(club);
  }
  localStorage.setItem('clubs', JSON.stringify(favouriteClubs));
}
export {
  getFavouriteClubs,
  toggleFavouriteClub,
}