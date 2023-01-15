import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      clientId: 'user',
      brokers: ['broker1:9091', 'broker2:9092', 'broker3:9093'],
    },
    consumer: {
      groupId: 'user-consumer',
      allowAutoTopicCreation: true,
    },
  },
};
