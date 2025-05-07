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
      • <span style={{fontWeight:600}}>Data We Collect.</span> Email, name, academic profile you enter, usage logs, and
      payment details handled by Stripe.<br/>
      • <span style={{fontWeight:600}}>How We Use It.</span> To deliver advice, improve the model, prevent fraud, and
      comply with law.<br/>
      • <span style={{fontWeight:600}}>Third-Party Processing.</span> We share data with OpenAI LLC to generate
      responses, and with Stripe Inc. to process payments. Both run in U.S.
      data centers.<br/>
      • <span style={{fontWeight:600}}>Your Choices.</span> You may delete your account at any time; we will erase
      personal data not required for legal or tax records within 30 days.
    </Text>

    {/* 3  Payments & Refunds */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      3. Payments&nbsp;&amp;&nbsp;Refunds
    </Text>
    <Text block>
      • Charges cover API and operating costs; we do not collect sales tax unless
      required in your state.<br/>
      • All fees are non-refundable once API usage occurs, except where required
      by consumer-protection law.<br/>
      • You remain responsible for chargebacks caused by unauthorized use of your
      payment method.
    </Text>

    {/* 4  Limitation of Liability */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      4. Limitation of Liability
    </Text>
    <Text block>
      To the fullest extent permitted by law, the service is provided “as is”
      without warranties of any kind. We (and our providers) are <u>not liable</u> for
      indirect, incidental, or consequential damages, or any loss of admissions
      offers, scholarships, or data, even if advised of the possibility. Our
      maximum aggregate liability will not exceed the fees you paid in the
      preceding 12 months.
    </Text>

    {/* 5  Dispute Resolution */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      5. Dispute Resolution
    </Text>
    <Text block>
      All disputes will be resolved by binding arbitration in King County,
      Washington, under the AAA Consumer Rules. You waive class-action rights.
    </Text>

    {/* 6  Changes */}
    <Text weight="semibold" block style={{ marginTop: 16 }}>
      6. Changes to These Terms
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
      ScholarPath AI&nbsp;LLC · 123 Main St, Sammamish WA 98074 ·
      support@scholarpath.ai
    </Text>
  </div>
);
