import React from 'react';
import { Text } from '@fluentui/react-components';

/**
 * Scroll-able block that shows the Terms of Service & Privacy Policy.
 * Replace the placeholder text with your real documents.
 */
export const TermsScrollArea: React.FC = () => (
  <div style={{ maxHeight: 380, overflowY: 'auto' }}>
    <Text block>
      Welcome! Before finishing your sign-up please read our Terms&nbsp;of&nbsp;Service and
      Privacy&nbsp;Policy. By checking the box below you confirm that you understand
      and agree to these terms.
    </Text>

    {/* 1  Use of Service */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      1. Use of Service
    </Text>
    <Text block>
      • <span style={{fontWeight:600}}>Informational Tool&nbsp;Only.</span> Our AI provides college-admission guidance based on
      historical data and machine-learning models. Recommendations are <u>not
      guarantees of admission or financial aid</u>.<br/>
      • <span style={{fontWeight:600}}>No Professional Advice.</span> The service is not a substitute for certified
      college-counseling, legal, or financial advice. Always verify important
      information with official sources.<br/>
      • <span style={{fontWeight:600}}>Permitted Users.</span> You must be 13 or older and located in the United States to
      create an account. If you are under 18, you represent that a parent or
      guardian consents to your use.<br/>
      • <span style={{fontWeight:600}}>Acceptable Conduct.</span> Do not upload unlawful, discriminatory, or false
      content, or attempt to reverse-engineer the service.
    </Text>

    {/* 2  Privacy & Data */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      2. Privacy &amp; Data
    </Text>
    <Text block>
      • <span style={{fontWeight:600}}>Data We Collect.</span> Email, name, academic profile you enter, usage logs.<br/>
      • <span style={{fontWeight:600}}>How We Use It.</span> To deliver advice, improve the model, prevent fraud, and
      comply with law.<br/>
      • <span style={{fontWeight:600}}>Third-Party Processing.</span> We share data with OpenAI LLC to generate
      responses, and with Stripe Inc. to process payments. Both run in U.S.
      data centers.<br/>
    </Text>

    {/* 3  Limitation of Liability */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      3. Limitation of Liability
    </Text>
    <Text block>
      To the fullest extent permitted by law, the service is provided “as is”
      without warranties of any kind. We (and our providers) are <u>not liable</u> for
      indirect, incidental, or consequential damages, or any loss of admissions
      offers, scholarships, or data, even if advised of the possibility. 
    </Text>

    {/* 4  Changes */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      4. Changes to These Terms
    </Text>
    <Text block>
      We may update terms with 15 days’ e-mail notice. Continued use after the
      effective date constitutes acceptance of the revised terms.
    </Text>

    {/* 7  Contact */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      7. Contact Us
    </Text>
    <Text block>
      birdie.counselor@gmail.com
    </Text>
  </div>
);
