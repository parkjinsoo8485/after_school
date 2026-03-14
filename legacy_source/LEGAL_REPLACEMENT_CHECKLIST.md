# Legal Replacement Checklist

Purpose: Replace dummy legal values in `terms.html` and `privacy.html` with production values.

Reference date: 2026-03-03 (KST)

## 1) Shared metadata

| Field | Current | Replace With | Files |
|---|---|---|---|
| `public_notice_date` | `2026-03-02` | `YYYY-MM-DD` | `terms.html`, `privacy.html` |
| `effective_date` | `2026-03-02` | `YYYY-MM-DD` | `terms.html`, `privacy.html` |
| `document_version` | `v1.0` | `vX.Y` | `terms.html`, `privacy.html` |
| `dummy_notice_banner` | Dummy data notice | Remove or replace with legal-approved notice | `terms.html`, `privacy.html` |

## 2) Business and contact details

| Field | Current | Replace With | Files |
|---|---|---|---|
| `company_name_ko` | `<dummy_company_name_ko>` | Official company name (KR) | `terms.html`, `privacy.html` |
| `company_name_en` | `After School Lab Inc.` | Official company name (EN) | `terms.html` |
| `ceo_name` | `<dummy_ceo_name>` | Legal representative name | `terms.html`, `privacy.html` |
| `business_registration_no` | `123-45-67890` | Real business registration number | `terms.html`, `privacy.html` |
| `ecommerce_registration_no` | `<dummy_ecommerce_registration_no>` | Real e-commerce registration number | `terms.html` |
| `business_address` | `<dummy_business_address>` | Real registered address | `terms.html`, `privacy.html` |
| `legal_email` | `legal@afterschool.example` | Real legal/official email | `terms.html`, `privacy.html` |
| `representative_phone` | `02-1234-5678` | Real representative phone | `terms.html`, `privacy.html` |
| `support_email` | `support@afterschool.example` | Real support email | `terms.html` |
| `support_phone` | `02-9876-5432` | Real support phone | `terms.html` |

## 3) Terms-only legal fields

| Field | Current | Replace With | File |
|---|---|---|---|
| `governing_law` | Republic of Korea law | Keep or legal-approved text | `terms.html` |
| `jurisdiction_court` | `<dummy_jurisdiction_court>` | Legal-approved jurisdiction court | `terms.html` |

## 4) Privacy-only legal fields

| Field | Current | Replace With | File |
|---|---|---|---|
| `third_party_disclosure` | `None (dummy)` | Actual disclosure list or confirmed none | `privacy.html` |
| `retention_member_content` | 30 days after withdrawal | Legal-approved retention period | `privacy.html` |
| `retention_access_log` | 180 days | Security/legal-approved retention period | `privacy.html` |
| `dormant_account_policy` | 12 months inactivity | Real dormant account policy | `privacy.html` |
| `vendor_firebase` | `Google Firebase` | Keep or legal entity exact name | `privacy.html` |
| `vendor_sentry` | `Sentry` | Keep if used, remove if unused | `privacy.html` |
| `cross_border_country` | `United States (dummy)` | Actual country/region | `privacy.html` |
| `cpo_name_title` | `<dummy_cpo_name_title>` | Real privacy officer name/title | `privacy.html` |
| `cpo_email` | `privacy@afterschool.example` | Real privacy officer email | `privacy.html` |
| `cpo_phone` | `02-2222-3333` | Real privacy officer phone | `privacy.html` |

## 5) Policy consistency checks

- Confirm whether users under age 14 are in scope.
- Confirm whether paid billing exists (if yes, add payment/refund clauses).
- Confirm whether marketing consent is separated.
- Confirm trackers/cookies in use (for example GA4, Meta Pixel).
- Align log retention with internal security policy.
- Confirm cross-border transfer notice requirements with legal team.

## 6) Post-replacement verification

1. Search for leftover dummy markers.
2. Validate all dates, email formats, and phone formats.
3. Confirm notice date/effective date/court fields are consistent across both documents.
4. Keep a record of legal-approved final version (document ID or PDF hash).

## 7) Quick PowerShell checks

```powershell
Select-String -Path terms.html,privacy.html -Pattern "afterschool\.example|Dummy|dummy_|123-45-67890|02-1234-5678|02-9876-5432|02-2222-3333"
```

