import React from 'react';

import HappyColor from '../../../assets/svg/happy-color.svg';
import Happy from '../../../assets/svg/happy.svg';
import AngryColor from '../../../assets/svg/angry-color.svg';
import Angry from '../../../assets/svg/angry.svg';
import VeryHappyColor from '../../../assets/svg/very-happy-color.svg';
import VeryHappy from '../../../assets/svg/very-happy.svg';
import SadColor from '../../../assets/svg/sad-color.svg';
import Sad from '../../../assets/svg/sad.svg';
import VerySadColor from '../../../assets/svg/very-sad-color.svg';
import VerySad from '../../../assets/svg/very-sad.svg';
import NeutralColor from '../../../assets/svg/neutral-color.svg';
import Neutral from '../../../assets/svg/neutral.svg';

import { EmojiContainer } from './styles';

interface IEmojisProps {
  selectedFeels: string;
  onSelectedFeelsChange: React.Dispatch<React.SetStateAction<string>>;
}

const Emojis: React.FC<IEmojisProps> = ({
  selectedFeels,
  onSelectedFeelsChange,
}) => {
  return (
    <EmojiContainer>
      {selectedFeels === 'angry' ? (
        <AngryColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('angry')}
        />
      ) : (
        <Angry
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('angry')}
        />
      )}

      {selectedFeels === 'very-sad' ? (
        <VerySadColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-sad')}
        />
      ) : (
        <VerySad
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-sad')}
        />
      )}

      {selectedFeels === 'sad' ? (
        <SadColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('sad')}
        />
      ) : (
        <Sad
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('sad')}
        />
      )}

      {selectedFeels === 'neutral' ? (
        <NeutralColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('neutral')}
        />
      ) : (
        <Neutral
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('neutral')}
        />
      )}

      {selectedFeels === 'happy' ? (
        <HappyColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('happy')}
        />
      ) : (
        <Happy
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('happy')}
        />
      )}

      {selectedFeels === 'very-happy' ? (
        <VeryHappyColor
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-happy')}
        />
      ) : (
        <VeryHappy
          width={60}
          height={40}
          onPress={() => onSelectedFeelsChange('very-happy')}
        />
      )}
    </EmojiContainer>
  );
};

export default Emojis;
