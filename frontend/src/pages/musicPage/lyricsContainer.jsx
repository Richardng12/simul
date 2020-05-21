/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles/lyrics.module.css';

const Lyrics = () => {
  return (
    <div>
      <p>Ha</p>
      <p>Oh my God, Ronny</p>
      <br />
      <p>I'm a big dog, baby, I'ma bark back (Bark back)</p>
      <p>Got a bad-ass bitch with her own racks (Own racks)</p>
      <p>They don't like it, they don't like it, tell 'em "Fuck that!" (Fuck that)</p>
      <p>Woah, kush thrown, get your contact (Yeah, yeah, yeah, woo)</p>
      <p>Bitches wanna talk to me, can't contact (Contact)</p>
      <p>Hit my nigga from the plug, he the contact (Contact)</p>
      <p>And we only do big contracts (Contracts)</p>
      <p>Woah, kush thrown, get your contact (Okay)</p>
      <br />
      <p>Knew she was the one soon as she opened her mouth</p>
      <p>Heard you from the West, but bad like you from the South</p>
      <p>You nigga always trippin', don't let you leave the house</p>
      <p>Remindin' me of my Apollo when she makin' it bounce</p>
      <p>You never smoke, you think of me, you think of a ounce</p>
      <p>You heard about me, now you wanna see what it's 'bout</p>
      <p>I be smokin' on some gas, yeah, give the cash, yeah</p>
      <p>Hear they got you comin' fast, yeah, make it last, yeah</p>
      <p>A hundred milli' in the bank, I just made it last year</p>
      <p>Hit it, then I'm gone, don't let you get attached, yeah</p>
      <p>Had a nigga who could handle you, so now we passed his</p>
      <p>Tryna spend it on you, baby, that's what all I'm askin'</p>
      <p>Face look bright, waist real tight</p>
      <p>I'mma get up on it, in the mornin', got a flight</p>
      <br />
      <p>I'm a big dog, baby, I'ma bark back (Bark back, okay)</p>
      <p>Got a bad-ass bitch with her own racks (Own racks)</p>
      <p>They don't like it, they don't like it, tell 'em "Fuck that!" (Fuck that)</p>
      <p>Woah, kush thrown, get your contact (Yeah, yeah, yeah, woo)</p>
      <p>Bitches wanna talk to me, can't contact (Contact)</p>
      <p>Hit my nigga from the plug, he the contact (Contact)</p>
      <p>And we only do big contracts (Contracts)</p>
      <p>Woah, kush thrown, get your contact</p>
      <br />
      <p>I go leather like Mike with the top back (Pew-pew)</p>
      <p>Niggas talkin' shit, I'mma dead that (Pow)</p>
      <p>I live what I rap, you live internet (Ha)</p>
      <p>She threw me the pussy, you tried to intercept</p>
      <p>Checkmate like it's chess, diamond rook on my neck (Yeah)</p>
      <p>I deal with your body, open your legs, put the dick (Yeah, yeah)</p>
      <p>She ask for some molly, then she pull me to the bed (Ha)</p>
      <p>I'm too busy to fuck her, I'mma settle for some head</p>
      <p>My new bae (Newbie), on the way (Zoom, zoom)</p>
      <p>She make that ass shake (Yeah), bought a bank (Ayy)</p>
      <p>Throw a hunnid to the face, make it earthquake (Ayy)</p>
      <p>Throwin' hunnids on that ass, it's your birthday (Ayy)</p>
      <p>Bring it back, get a stack, make it earthquake (Woo)</p>
      <p>Run a cake like a motherfuckin' birthday</p>
      <p>I'm a big dog, baby, I'ma bark back (Bark back)</p>
      <p>Got a bad-ass bitch with her own racks (Own racks)</p>
      <p>They don't like it, they don't like it, tell 'em "Fuck that!" (Fuck that)</p>
      <p>Woah, kush thrown, get your contact (Yeah, yeah, yeah, woo)</p>
      <p>Bitches wanna talk to me, can't contact (Contact)</p>
      <p>Hit my nigga from the plug, he the contact (Contact)</p>
      <p>And we only do big contracts (Contracts)</p>
      <p>Woah, kush thrown, get your contact</p>
      <p>Oh my God, Ronny</p>
    </div>
  );
};

const LyricsContainer = props => {
  const { className } = props;
  return (
    <div className={classNames(styles.lyricsContainer, className)}>
      <Lyrics className={styles.lyrics} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentSong: state.musicReducer.currentSong,
  };
};

export default connect(mapStateToProps)(LyricsContainer);
