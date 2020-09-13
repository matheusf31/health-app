import React from 'react';

import HappyColor from '../../../assets/feels/happy-color.svg';
import Happy from '../../../assets/feels/happy.svg';
import AngryColor from '../../../assets/feels/angry-color.svg';
import Angry from '../../../assets/feels/angry.svg';
import VeryHappyColor from '../../../assets/feels/very-happy-color.svg';
import VeryHappy from '../../../assets/feels/very-happy.svg';
import SadColor from '../../../assets/feels/sad-color.svg';
import Sad from '../../../assets/feels/sad.svg';
import VerySadColor from '../../../assets/feels/very-sad-color.svg';
import VerySad from '../../../assets/feels/very-sad.svg';
import NeutralColor from '../../../assets/feels/neutral-color.svg';
import Neutral from '../../../assets/feels/neutral.svg';

import { EmojiContainer } from './styles';

interface IEmojisProps {
  selectedFeel: string;
  handleChangeFeels(feel: string): Promise<void>;
}

const Emojis: React.FC<IEmojisProps> = ({
  selectedFeel,
  handleChangeFeels,
}) => {
  return (
    <EmojiContainer>
      {selectedFeel === 'angry' ? (
        <AngryColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('angry')}
        />
      ) : (
        <Angry
          width={60}
          height={40}
          onPress={() => handleChangeFeels('angry')}
        />
      )}

      {selectedFeel === 'very-sad' ? (
        <VerySadColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('very-sad')}
        />
      ) : (
        <VerySad
          width={60}
          height={40}
          onPress={() => handleChangeFeels('very-sad')}
        />
      )}

      {selectedFeel === 'sad' ? (
        <SadColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('sad')}
        />
      ) : (
        <Sad width={60} height={40} onPress={() => handleChangeFeels('sad')} />
      )}

      {selectedFeel === 'neutral' ? (
        <NeutralColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('neutral')}
        />
      ) : (
        <Neutral
          width={60}
          height={40}
          onPress={() => handleChangeFeels('neutral')}
        />
      )}

      {selectedFeel === 'happy' ? (
        <HappyColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('happy')}
        />
      ) : (
        <Happy
          width={60}
          height={40}
          onPress={() => handleChangeFeels('happy')}
        />
      )}

      {selectedFeel === 'very-happy' ? (
        <VeryHappyColor
          width={60}
          height={40}
          onPress={() => handleChangeFeels('very-happy')}
        />
      ) : (
        <VeryHappy
          width={60}
          height={40}
          onPress={() => handleChangeFeels('very-happy')}
        />
      )}
    </EmojiContainer>
  );
};

export default Emojis;
