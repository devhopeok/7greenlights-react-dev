export const AUTH_TOKEN_KEY = 'auth_token';
export const TOKEN_HEADER_NAME = 'X-USER-TOKEN';
export const MIN_PASSWORD_LENGTH = 8;
export const LANDING_ARENA_PAGE_SIZE = 20;

export const MAX_BLAST_LENGTH = 189;

export const oppositeFilters = [[0, 2], [3, 4]];

export const arenasFiltersIds = {
  active: 0,
  greenlit: 1,
  archived: 2,
  featured: 3,
  nonFeatured: 4,
};

export const arenasFilters = [
  { id: arenasFiltersIds.greenlit, name: 'greenlit', label: 'GreenLit® Venues™' },
  { id: arenasFiltersIds.active, name: 'active', label: 'Active Venues™' },
  { id: arenasFiltersIds.archived, name: 'archived', label: 'Archived Venues™' },
  { id: arenasFiltersIds.featured, name: 'featured', label: 'Featured Venues™' },
  { id: arenasFiltersIds.nonFeatured,
    name: 'non_featured',
    label: 'Non-featured Venues™'
  },
];

export const userPostedFilterId = 5;

export const arenasSortingOptions = [
  { id: 1, name: 'total_greenlights', label: 'Total GreenLights®' },
  { id: 0, name: 'remaining', label: 'Time Remaining' },
  { id: 2, name: 'alphabetically', label: 'Content Title' },
  { id: 3, name: 'newest', label: 'Newest' },
];

export const mediaFilters = {
  arenas: { id: 0, name: 'arenas_ids' },
  types: { id: 1, name: 'content_types' },
  pops: { id: 2, name: 'pop_types' },
};

export const contentTypes = {
  music: 1,
  video: 2,
};

// We also have a Others type defined on the API but was disabled since we
// dont support other media types yet.
export const mediaTypeFilters = [
  { id: contentTypes.music, name: 'music', label: 'Music' },
  { id: contentTypes.video, name: 'video', label: 'Video' },
];

export const popsFilters = [
  { id: 0, name: 'pops-a', label: 'Pops A' },
  { id: 1, name: 'pops-b', label: 'Pops B' },
  { id: 2, name: 'pops-c', label: 'Pops C' },
  { id: 3, name: 'pops-d', label: 'Pops D' },
];

export const mediaSortingOptions = [
  { id: 1, name: 'total_greenlights', label: 'Total GreenLights®' },
  { id: 3, name: 'newest', label: 'Recently Added' },
  { id: 0, name: 'alpha_creator', label: 'Creator Name' },
  { id: 2, name: 'alphabetically', label: 'Content Title' },
];

export const aboutTabs = {
  help: 'help',
  mission: 'mission',
  faq: 'faq',
  about: 'about',
  sponsors: 'sponsorship opportunities',
  legal: 'legal',
};

export const dndItemTypes = {
  NOTE: 'note'
};

export const notificationTypes = {
  MEDIA_CONTENT_GL: 'MediaContentGreenlit',
  NOTE_FEATURED: 'NoteFeatured',
  NOTE_GREENLIT: 'NoteGreenlit',
  NOTE_UPLOADED: 'NoteUploaded',
  USER_GREENLIT: 'UserGreenlit',
  MEDIA_CONTENT_REPORTED: 'MediaContentReported'

};

export const mediaListIds = {
  myMedia: 1,
  myStream: 2,
  arenaPage: 3,
  profilePage: 4,
};

export const shareableTypes = {
  media: 0,
  arena: 1,
};

export const supportedMediaSources = {
  spotify: { urlPieces: ['spotify:', 'spotify.com'] },
  soundcloud: { urlPieces: ['soundcloud.com'] },
  vimeo: { urlPieces: ['vimeo.com'] },
  youtube: { urlPieces: ['youtube.com', 'youtu.be'] },
};

export const tooltipPages = {
  home: /\/$/g,
  mystream: /\/mystream$/g,
  mymedia: /\/mymedia$/g,
  profile: /\/profile\/\d+$/g,
  media: /(\/mymedia|\/mystream|\/arena\/\d+$)$/g,
  arena: /\/arena\/\d+$/g,
  featuredNotes: /\/media\/\d+\/notes$/g,
};

export const tooltipIds = {
  homeBlast: 'home_blast',
  homeGreenlight: 'home_greenlight',
  homeArena: 'home_arena',
  myMediaUpload: 'my_media_upload',
  myMediaExternalLinks: 'my_media_external_links',
  myMediaBlast: 'my_media_blast',
  mediaNotes: 'media_notes',
  notesGreenlight: 'notes_greenlight',
  myStream: 'my_stream',
  myStreamFilters: 'my_stream_filters',
  myProfile: 'my_profile',
  arenaTime: 'arena_time',
  arenaPost: 'arena_post',
  arenaSponsoring: 'arena_sponsoring',
  featuredNotes: 'featured_notes',
};

export const tooltipArray = [
  {
    id: tooltipIds.homeBlast,
    order: 1,
    text: 'Blasts™ are updates that travel with songs and videos you post to Venues™',
    classname: 'home-blast',
    page: tooltipPages.home,
  },
  {
    id: tooltipIds.homeArena,
    order: 2,
    text: 'Venues™ are genre-based, location-specific events that you may post your songs and videos to',
    classname: 'home-arena',
    page: tooltipPages.home,
  },
  {
    id: tooltipIds.homeGreenlight,
    order: 3,
    text: 'GreenLight® Venues™ of interest in order to track what\'s happening and stay informed with notifications',
    classname: 'home-greenlight',
    page: tooltipPages.home,
  },
  {
    id: tooltipIds.myMediaUpload,
    order: 1,
    text: 'Once you upload your content from an approved 3rd party platform (e.g. SoundCloud, Vimeo, Spotify, YouTube), you may post that content to an Venue™',
    classname: 'mymedia-upload',
    page: tooltipPages.mymedia,
  },
  {
    id: tooltipIds.myMediaBlast,
    order: 2,
    text: 'Post a Blast™ — Share news and updates that will travel with your content to any Venues™ you post your content to',
    classname: 'mymedia-blast',
    page: tooltipPages.mymedia,
  },
  {
    id: tooltipIds.myMediaExternalLinks,
    order: 3,
    text: 'Is your song or video available to stream from multiple platforms? Add all relevant links here prior to selecting ‘Upload Media\'',
    classname: 'mymedia-external-links',
    page: tooltipPages.mymedia,
  },
  {
    id: tooltipIds.mediaNotes,
    order: 1,
    text: 'Notes™ are images fans may post to artist content.  Notes™ posted to an artist\'s song or video will not be visible to other users unless \'featured\' by the artist.  Notes™ ‘featured\' by an artist will travel with his or her content to any Venue™ the artist posts their content to',
    classname: 'media-notes',
    page: tooltipPages.media,
  },
  {
    id: tooltipIds.notesGreenlight,
    order: 2,
    text: 'GreenLight® any Notes™ that artists feature with their content by selecting the GreenLight® icon appearing in the upper-right of every featured Note™.  Users will have the ability to sort content posted to Venues™ by Total GreenLights®',
    classname: 'notes-greenlight',
    page: tooltipPages.media,
  },
  {
    id: tooltipIds.myStream,
    order: 1,
    text: 'All content you GreenLight® appears here.  You can "Filter by Venue™" in order to stream only the content you have GreenLit® in a specific Venue™',
    classname: 'mystream',
    page: tooltipPages.mystream,
  },
  {
    id: tooltipIds.myStreamFilters,
    order: 2,
    text: 'Filter content you have GreenLit® by Venue™ here',
    classname: 'mystream-filters',
    page: tooltipPages.mystream,
  },
  {
    order: 1,
    id: tooltipIds.myProfile,
    text: 'View users you have GreenLit® and update your bio from here',
    classname: 'myprofile',
    page: tooltipPages.profile,
  },
  {
    id: tooltipIds.arenaTime,
    order: 1,
    text: 'Time remaining before this Venue™ is archived',
    classname: 'arena-time',
    page: tooltipPages.arena,
  },
  {
    id: tooltipIds.arenaPost,
    order: 2,
    text: 'Post your songs or videos to this Venue™ here!',
    classname: 'arena-post',
    page: tooltipPages.arena,
  },
  {
    id: tooltipIds.arenaSponsoring,
    order: 3,
    text: 'Interested in sponsoring this Venue™?  If you would like to show your support for the community of independent artists and fans who are posting and streaming content from this Venue™, send us your info and we will follow up soon!',
    classname: 'arena-sponsoring',
    page: tooltipPages.arena,
  },
  {
    id: tooltipIds.featuredNotes,
    order: 1,
    text: 'Feature any Notes™ that other users have posted to your content by "dragging" them to the \'featured\' row above.  Any Notes™ that you feature will be visible to other users wherever you post your content',
    classname: 'featured-notes-tt',
    page: tooltipPages.featuredNotes,
  }
];

export const profileTabs = {
  media: 'media',
  bio: 'bio',
  blasts: 'blasts',
  greenlitPeople: 'greenlit_people',
  notes: 'notes',
};
