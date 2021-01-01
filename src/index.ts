import '@config/dotenv';
import '@shared/infra/mongoose/connection';

import app from './server';

app.listen(4000, async () => {
  console.log('Server is listening on port 4000');
});
