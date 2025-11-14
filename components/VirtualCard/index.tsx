import { Image, ImageBackground } from 'expo-image';
import { memo } from 'react';
import { View } from 'react-native';

// Components
import { Text } from '@/components';
import { ChipIcon, WifiIcon } from '@/components/icons';

// Styles

import { styles } from './styles';

export type TVirtualCardProps = {
  cardNumber: string;
  holderName: string;
  expiry: string;
  cvv: string;
  brandLogo: string;
  brandName: string;
};

const VirtualCard = ({
  cardNumber,
  holderName,
  expiry,
  cvv,
  brandLogo,
  brandName,
}: TVirtualCardProps) => {
  const groups = cardNumber.match(/.{1,4}/g) || [];

  return (
    <ImageBackground
      source={require('@/assets/images/virtual-card-bg.png')}
      style={styles.container}
      imageStyle={styles.bgImage}>
      {/* Top row */}
      <View style={styles.topRow}>
        <ChipIcon />
        <WifiIcon />
      </View>

      {/* Card Numbers */}
      <View style={styles.numberRow}>
        {groups.map((g, i) => (
          <Text key={i} size="lg" style={styles.cardNumber}>
            {g}
          </Text>
        ))}
      </View>

      {/* Holder Name */}
      <Text style={styles.holderName}>{holderName}</Text>

      {/* Expiry + CVV */}
      <View style={styles.infoRow}>
        <View>
          <Text size="2xs" style={styles.label}>
            Expiry Date
          </Text>
          <Text size="sm" style={styles.infoValue}>
            {expiry}
          </Text>
        </View>

        <View style={styles.infoBlock}>
          <Text size="2xs" style={styles.label}>
            CVV
          </Text>
          <Text size="sm" style={styles.infoValue}>
            {cvv}
          </Text>
        </View>

        {/* Brand logo + name */}
        <View style={styles.brandContainer}>
          <Image
            source={brandLogo}
            style={styles.brandLogo}
            contentFit="contain"
          />
          <Text size="xs" style={styles.brandText}>
            {brandName}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default memo(VirtualCard);
