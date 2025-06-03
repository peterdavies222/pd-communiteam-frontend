import { LitElement, html } from 'lit'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Utils from '../Utils'
import profile from '../views/pages/profile'
import explore from '../views/pages/explore'
import drafts from '../views/pages/myEvents/drafts'
import saved from '../views/pages/myEvents/saved'

// SVGs

const dashboardIcon = html`<svg width="19" height="20" viewBox="0 0 19 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3296 12.0331C11.3296 12.0283 11.3295 12.0155 11.3091 11.996C11.2875 11.9755 11.2498 11.9551 11.1968 11.955H7.79639C7.74333 11.9551 7.70565 11.9755 7.68408 11.996C7.66369 12.0155 7.66358 12.0283 7.66357 12.0331V17.4999H11.3296V12.0331ZM13.3296 17.4999H16.2964C16.7307 17.4999 16.9963 17.1774 16.9966 16.8837V7.5595C16.9966 7.55592 16.9961 7.55004 16.9917 7.54192L16.9595 7.5097L9.59326 2.52728C9.55222 2.4996 9.49488 2.49297 9.4458 2.50677L9.3999 2.52728L2.03369 7.5097C2.01595 7.5217 2.00601 7.5336 2.00146 7.54192C1.99706 7.55004 1.99659 7.55592 1.99658 7.5595V16.8837C1.99687 17.1774 2.26247 17.4999 2.69678 17.4999H5.66357V12.0331C5.66359 10.8389 6.66621 9.95511 7.79639 9.95501H11.1968C12.327 9.95511 13.3296 10.8389 13.3296 12.0331V17.4999ZM18.9966 16.8837C18.9963 18.3754 17.7395 19.4999 16.2964 19.4999H2.69678C1.25371 19.4999 -0.003147 18.3754 -0.00341797 16.8837V7.5595C-0.00340615 6.86518 0.350008 6.23296 0.912598 5.85247L8.27979 0.871025L8.41943 0.784111C9.13157 0.378237 10.0275 0.407247 10.7134 0.871025L18.0806 5.85247L18.1831 5.92669C18.6857 6.31215 18.9966 6.90843 18.9966 7.5595V16.8837Z" fill="currentColor"/>
</svg>
`

const exploreIcon = html`<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9966 10C16.9966 5.85786 13.6387 2.5 9.49658 2.5C5.35445 2.5 1.99658 5.85786 1.99658 10C1.99658 14.1421 5.35445 17.5 9.49658 17.5C13.6387 17.5 16.9966 14.1421 16.9966 10ZM13.6118 4.62305C13.9701 4.50544 14.3647 4.59954 14.6313 4.86621C14.898 5.13299 14.9913 5.52741 14.8735 5.88574L12.7925 12.2178C12.6932 12.5195 12.4556 12.7563 12.1538 12.8555L11.8423 11.9053L11.8413 11.9043L12.1538 12.8555L5.82471 14.9346L5.68896 14.9688C5.36983 15.026 5.03854 14.9248 4.80518 14.6914C4.53867 14.4247 4.44529 14.0301 4.56299 13.6719L6.64209 7.34277L6.68604 7.2334C6.80188 6.9844 7.01561 6.79193 7.27979 6.70508L13.6118 4.62305ZM8.38428 8.44727L7.07959 12.416L11.0493 11.1123L12.355 7.1416L8.38428 8.44727ZM18.9966 10C18.9966 15.2467 14.7433 19.5 9.49658 19.5C4.24988 19.5 -0.00341797 15.2467 -0.00341797 10C-0.00341797 4.75329 4.24988 0.5 9.49658 0.5C14.7433 0.5 18.9966 4.75329 18.9966 10Z" fill="currentColor"/>
</svg>
`

const myEventsIcon = html`<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 0C14.7467 0 19 4.25329 19 9.5C19 10.3647 18.8844 11.2029 18.668 11.999L18.5596 12.3691C17.3592 16.1628 13.8413 18.9266 9.66797 18.999L9.5 19C4.2533 19 0 14.7467 0 9.5C0 8.74332 0.0886968 8.00735 0.255859 7.30176L0.332031 7.00195C1.38113 3.14336 4.80107 0.260689 8.93066 0.0166016L9.33203 0.00195312C9.38791 0.00098431 9.44389 0 9.5 0ZM9.0127 2.01562C5.89542 2.21543 3.29125 4.32156 2.36328 7.18359C6.71773 8.04963 10 11.8911 10 16.5C10 16.6621 9.99338 16.8232 9.98535 16.9834C13.1035 16.7843 15.7066 14.6781 16.6348 11.8154C12.2813 10.9486 9 7.10819 9 2.5C9 2.33755 9.00462 2.17607 9.0127 2.01562ZM2.00781 9.16895C2.00308 9.27864 2 9.38898 2 9.5C2 13.0749 4.50171 16.0634 7.84961 16.8154C7.89678 16.826 7.94371 16.838 7.99121 16.8477C7.99644 16.7325 8 16.6166 8 16.5C8 12.8743 5.4273 9.84927 2.00781 9.15137C2.00755 9.15721 2.00806 9.1631 2.00781 9.16895ZM11 2.5C11 6.12456 13.5714 9.14755 16.9893 9.84668C16.9945 9.73182 17 9.61633 17 9.5C17 5.87398 14.4268 2.84891 11.0068 2.15137C11.0016 2.26682 11 2.38308 11 2.5Z" fill="currentColor"/>
</svg>
`

const messagesIcon = html`<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9976 10C16.9976 5.85778 13.6401 2.5 9.49854 2.5C5.35701 2.50009 1.99951 5.85783 1.99951 10C1.99951 14.1422 5.35701 17.4999 9.49854 17.5C10.8337 17.5 12.0845 17.1516 13.1685 16.542L13.2534 16.5C13.4561 16.4101 13.684 16.3893 13.9009 16.4434L16.7983 17.168L16.2856 13.5752C16.2592 13.3899 16.2852 13.2005 16.3608 13.0293C16.7698 12.1042 16.9976 11.08 16.9976 10ZM18.9976 10C18.9976 11.2578 18.7498 12.4594 18.3042 13.5605L18.9897 18.3574C19.0368 18.687 18.9167 19.0192 18.6694 19.2422C18.453 19.4373 18.1637 19.527 17.8784 19.4922L17.7573 19.4697L13.7876 18.4766C12.4981 19.1303 11.0404 19.5 9.49854 19.5C4.25226 19.4999 -0.000488281 15.2466 -0.000488281 10C-0.000488281 4.75344 4.25226 0.500092 9.49854 0.5C14.7449 0.5 18.9976 4.75338 18.9976 10Z" fill="currentColor"/>
</svg>
`

const profileIcon = html`<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10C17 5.85786 13.6421 2.5 9.5 2.5C5.35786 2.5 2 5.85786 2 10C2 11.8303 2.65682 13.5066 3.74609 14.8086C3.9334 14.6137 4.13579 14.4066 4.3418 14.2061C4.65163 13.9044 4.98815 13.597 5.29688 13.3584C5.45001 13.24 5.61819 13.1209 5.78906 13.0273C5.92749 12.9515 6.20422 12.8136 6.53711 12.8135H12.4629C12.9646 12.8135 13.4256 13.0574 13.7295 13.248C14.073 13.4635 14.4171 13.7424 14.7246 14.0205C14.95 14.2243 15.1693 14.4456 15.373 14.6602C16.3901 13.3801 17 11.7619 17 10ZM6.69922 14.8135C6.65558 14.8414 6.59523 14.8819 6.51953 14.9404C6.29935 15.1107 6.02656 15.3581 5.7373 15.6396C5.56101 15.8113 5.38552 15.9883 5.22168 16.1582C6.43533 17.003 7.90921 17.5 9.5 17.5C11.1594 17.5 12.6914 16.9592 13.9336 16.0469C13.7684 15.8724 13.5818 15.6838 13.3828 15.5039C13.1232 15.2692 12.8754 15.0732 12.667 14.9424C12.5221 14.8515 12.4444 14.8217 12.4238 14.8135H6.69922ZM11.5449 7.10254C11.5447 6.06387 10.6542 5.15625 9.5 5.15625C8.34593 5.15638 7.45625 6.06395 7.45605 7.10254C7.45605 8.14127 8.3458 9.04967 9.5 9.0498C10.6543 9.0498 11.5449 8.14134 11.5449 7.10254ZM19 10C19 15.2467 14.7467 19.5 9.5 19.5C4.25329 19.5 0 15.2467 0 10C0 4.75329 4.25329 0.5 9.5 0.5C14.7467 0.5 19 4.75329 19 10ZM13.5449 7.10254C13.5449 9.30704 11.6968 11.0498 9.5 11.0498C7.30335 11.0497 5.45605 9.30695 5.45605 7.10254C5.45625 4.89829 7.30347 3.15639 9.5 3.15625C11.6967 3.15625 13.5447 4.89821 13.5449 7.10254Z" fill="currentColor"/>
</svg>

`

const postIcon = html`<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4631 3.77355C12.3921 3.07474 11.8021 2.52941 11.0846 2.52941H3.91544C3.14995 2.52941 2.52941 3.14997 2.52941 3.91544V11.0846C2.52941 11.85 3.14995 12.4706 3.91544 12.4706H11.0846C11.8021 12.4706 12.3921 11.9253 12.4631 11.2264L12.4706 11.0846V3.91544L12.4631 3.77355ZM6.73529 10.3676V8.26471H4.63235C4.21003 8.26471 3.86766 7.92232 3.86765 7.5C3.86765 7.07766 4.21002 6.73529 4.63235 6.73529H6.73529V4.63235C6.73529 4.21002 7.07767 3.86765 7.5 3.86765C7.92234 3.86765 8.26471 4.21002 8.26471 4.63235V6.73529H10.3676L10.4461 6.73903C10.8316 6.77828 11.1324 7.10413 11.1324 7.5C11.1323 7.89586 10.8316 8.22172 10.4461 8.26097L10.3676 8.26471H8.26471V10.3676C8.26468 10.79 7.92232 11.1324 7.5 11.1324C7.07768 11.1324 6.73532 10.79 6.73529 10.3676ZM14 11.0846L13.9963 11.2347C13.9182 12.7751 12.6444 14 11.0846 14H3.91544C2.30529 14 1 12.6947 1 11.0846V3.91544C1 2.30529 2.30529 1 3.91544 1H11.0846C12.6947 1 14 2.30529 14 3.91544V11.0846Z" fill="currentColor"/>
</svg>`

const savedIcon = html`<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.69434 9.79938C7.22553 9.48922 7.8992 9.51156 8.41002 9.86611L11.4286 11.9618V3.03556H3.57143V11.9618L6.58998 9.86611L6.69434 9.79938ZM13 11.9618L12.9962 12.0772C12.9133 13.2151 11.614 13.8703 10.6168 13.2769L10.5186 13.2132L7.5 11.1183L4.48145 13.2132L4.38323 13.2769C3.38601 13.8703 2.08673 13.2151 2.00384 12.0772L2 11.9618V3.03556C2 2.24041 2.61853 1.58676 3.41106 1.50825L3.57143 1.5H11.4286L11.5889 1.50825C12.3815 1.58676 13 2.24041 13 3.03556V11.9618Z" fill="currentColor"/>
</svg>
`

const draftsIcon = html`<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.3158 13.1L13.386 13.1034C13.7309 13.1393 14 13.4376 14 13.8C14 14.1624 13.7309 14.4607 13.386 14.4966L13.3158 14.5H7.50005C7.12217 14.5 6.81584 14.1866 6.81584 13.8C6.81584 13.4134 7.12217 13.1 7.50005 13.1H13.3158ZM9.45244 1.31949C10.4927 0.226855 12.1866 0.226819 13.2269 1.31949L13.3205 1.42271C14.2264 2.47531 14.2263 4.07588 13.3205 5.12851L13.2269 5.23174C13.2242 5.23461 13.2217 5.2378 13.2189 5.24063L5.80089 12.7698C5.7224 12.8494 5.6259 12.9081 5.52026 12.9414L1.88542 14.0871C1.64492 14.1628 1.38311 14.0976 1.20389 13.9169C1.0246 13.7361 0.95689 13.4689 1.02749 13.2217L2.11794 9.40376L2.14534 9.32582C2.17683 9.25013 2.22091 9.18028 2.2763 9.12006L9.44375 1.32838L9.45244 1.31949ZM2.69725 12.3665L4.53204 11.7875L3.20372 10.5919L2.69725 12.3665ZM12.2467 2.29636C11.7436 1.76786 10.9358 1.76789 10.4326 2.29636L3.92267 9.37299L5.66124 10.9391L12.2467 4.25487L12.3369 4.15028C12.7298 3.64361 12.7298 2.90758 12.3369 2.40095L12.2467 2.29636Z" fill="currentColor"/>
</svg>
`

const attendingIcon = html`<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4706 7.5C12.4706 4.75482 10.2452 2.52941 7.5 2.52941C4.75482 2.52941 2.52941 4.75482 2.52941 7.5C2.52941 10.2452 4.75482 12.4706 7.5 12.4706C10.2452 12.4706 12.4706 10.2452 12.4706 7.5ZM8.96145 5.67412C9.26009 5.37548 9.74416 5.37548 10.0428 5.67412C10.3414 5.97275 10.3414 6.45682 10.0428 6.75546L7.32376 9.47449C7.02512 9.77313 6.54105 9.77313 6.24242 9.47449L5.31566 8.54774L5.26264 8.48949C5.01785 8.18913 5.03576 7.7463 5.31566 7.46639C5.59556 7.18649 6.0384 7.16859 6.33875 7.41337L6.397 7.46639L6.78309 7.85248L8.96145 5.67412ZM14 7.5C14 11.0899 11.0899 14 7.5 14C3.91015 14 1 11.0899 1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5Z" fill="currentColor"/>
</svg>
`

const logoutIcon = html`<svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.96035 1.34961L5.12246 1.34961C5.53657 1.34972 5.87246 1.68546 5.87246 2.09961C5.87246 2.51375 5.53657 2.8495 5.12246 2.84961L2.96035 2.84961C2.82967 2.84964 2.70515 2.90146 2.61464 2.99121C2.52464 3.08065 2.4751 3.20058 2.475 3.32422L2.475 10.6748C2.47505 10.7985 2.52466 10.9183 2.61464 11.0078C2.70515 11.0976 2.82967 11.1494 2.96035 11.1494L5.12246 11.1494C5.53651 11.1495 5.87235 11.4854 5.87246 11.8994C5.87246 12.3136 5.53657 12.6493 5.12246 12.6494L2.96035 12.6494C2.43588 12.6494 1.93174 12.4429 1.55898 12.0732C1.18603 11.7034 0.975048 11.2006 0.974995 10.6748L0.974996 3.32422C0.9751 2.79852 1.18607 2.29558 1.55898 1.92578C1.93173 1.55618 2.43592 1.34964 2.96035 1.34961ZM5.27578 6.27539L10.5228 6.27539L9.05898 4.74316L9.0082 4.68457C8.77504 4.38458 8.80271 3.95074 9.08339 3.68262C9.38288 3.3967 9.85689 3.4077 10.143 3.70703L12.8178 6.50684L12.9086 6.62305C13.0902 6.90854 13.06 7.28936 12.8178 7.54297L10.143 10.3428L10.0873 10.3955C9.79835 10.6423 9.36416 10.6352 9.08339 10.3672C8.80271 10.0991 8.77506 9.66522 9.0082 9.36523L9.05898 9.30664L10.5219 7.77539L5.27578 7.77539C4.86173 7.77539 4.52604 7.43938 4.52578 7.02539C4.52578 6.61118 4.86156 6.27539 5.27578 6.27539Z" fill="currentColor"/>
</svg>
`

const profileIconSml = html`<svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8506 7C11.8504 4.3216 9.67845 2.15039 7 2.15039C4.32173 2.1506 2.1506 4.32173 2.15039 7C2.15039 8.14674 2.54947 9.20003 3.21484 10.0303C3.31837 9.92367 3.42841 9.81377 3.53906 9.70605C3.74408 9.50649 3.9684 9.30093 4.17578 9.14062C4.27849 9.06124 4.39342 8.97983 4.51172 8.91504C4.60584 8.8635 4.80545 8.7627 5.04883 8.7627H8.95215C9.3099 8.7627 9.63218 8.93628 9.83496 9.06348C10.0674 9.20931 10.2991 9.39685 10.5039 9.58203C10.6271 9.69345 10.7482 9.8125 10.8633 9.93066C11.4819 9.11645 11.8506 8.10143 11.8506 7ZM5.09277 10.3271C4.95173 10.4362 4.77465 10.5966 4.58496 10.7812C4.49614 10.8677 4.40722 10.9559 4.32227 11.043C5.08972 11.5524 6.00984 11.8505 7 11.8506C8.03593 11.8506 8.99526 11.524 9.7832 10.9707C9.69483 10.8802 9.59823 10.7858 9.49707 10.6943C9.32818 10.5416 9.16928 10.4163 9.03809 10.334C8.96518 10.2883 8.92206 10.2697 8.90527 10.2627H5.18555C5.16192 10.2787 5.13011 10.2983 5.09277 10.3271ZM8.25684 5.0918C8.25684 4.46067 7.71376 3.90061 7.00098 3.90039C6.28801 3.90039 5.74512 4.46055 5.74512 5.0918C5.74517 5.723 6.28804 6.2832 7.00098 6.2832C7.71371 6.28298 8.25678 5.72288 8.25684 5.0918ZM13.3506 7C13.3506 10.507 10.507 13.3506 7 13.3506C3.49317 13.3504 0.650391 10.5069 0.650391 7C0.650601 3.4933 3.4933 0.650601 7 0.650391C10.5069 0.650391 13.3504 3.49317 13.3506 7ZM9.75684 5.0918C9.75678 6.59713 8.49556 7.78298 7.00098 7.7832C5.50621 7.7832 4.24517 6.59727 4.24512 5.0918C4.24512 3.58628 5.50618 2.40039 7.00098 2.40039C8.49562 2.40061 9.75684 3.58643 9.75684 5.0918Z" fill="currentColor"/>
</svg>
`

const hamburgerIcon = html`<svg width="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>`

const rightChevronIcon = html`<svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`

const leftChevronIcon = html`<svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>`

customElements.define('ct-nav', class Communiteam extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      section: {
        type: String
      },
      messagecount: {
        type: Number
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  testHandler(){
    alert("test")
  }

  hamburgerToggle() {
    let hamburgerIcon = this.renderRoot.querySelector('.nav__hamburger')
    let options = this.renderRoot.querySelector('.nav--mobile--lower')
    let isExpanded = hamburgerIcon.getAttribute('aria-expanded') === 'true'

    function open() {
      hamburgerIcon.setAttribute('aria-expanded', 'true')
      options.setAttribute('data-expanded', 'true')
    }
    function close() {
      hamburgerIcon.setAttribute('aria-expanded', 'false')
      options.setAttribute('data-expanded', 'false')
    }

    isExpanded ? close() : open()
  }

  eventsToggle() {
    let myEventsList = this.renderRoot.querySelector('.nav--mobile__list.myevents')
    let mainListItems = this.renderRoot.querySelectorAll('.nav--mobile--lower>ul>li>a, .nav--mobile--lower>ul>li>button')

    mainListItems.forEach((item)=> {
      item.style.opacity = "0"
      setTimeout(()=> {
        item.style.display = "none"
      }, "400")
      setTimeout(()=> {
        myEventsList.setAttribute('data-expanded', 'true')
      }, "200")
    })

   
  }

  eventsBackToggle() {
    
    let myEventsList = this.renderRoot.querySelector('.nav--mobile__list.myevents')
    let mainListItems = this.renderRoot.querySelectorAll('.nav--mobile--lower>ul>li>a, .nav--mobile--lower>ul>li>button')
    
    myEventsList.setAttribute('data-expanded', 'false')

    mainListItems.forEach((item)=> {
      item.style.display = "flex"
      setTimeout(()=> {
        item.style.opacity = "1"
      }, "200")
    })
  }

  profileToggle() {
    let profileList = this.renderRoot.querySelector('.nav--mobile__list.profile')
    let mainListItems = this.renderRoot.querySelectorAll('.nav--mobile--lower>ul>li>a, .nav--mobile--lower>ul>li>button')
    
    mainListItems.forEach((item)=> {
      item.style.opacity = "0"
      setTimeout(()=> {
        item.style.display = "none"
      }, "400")
      setTimeout(()=> {
        profileList.setAttribute('data-expanded', 'true')
      }, "200")
    })

  }

  profileBackToggle() {
    
    let profileList = this.renderRoot.querySelector('.nav--mobile__list.profile')
    let mainListItems = this.renderRoot.querySelectorAll('.nav--mobile--lower>ul>li>a, .nav--mobile--lower>ul>li>button')
    
    profileList.setAttribute('data-expanded', 'false')

    mainListItems.forEach((item)=> {
      item.style.display = "flex"
      setTimeout(()=> {
        item.style.opacity = "1"
      }, "200")
    })
  }

  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    gotoRoute(pathname)
  }
  
  render(){    
    return html`
    <style>
      * {
        box-sizing: border-box;
      }
      nav {
        box-sizing: border-box;
        margin: 0;
        height: fit-content;
        padding: 15px 30px;
        background-color: var(--ct-lightyellow);
        border-radius: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: fit-content;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 30px;
        left: var(--ct-margins);
        width: calc(100vw - 2*var(--ct-margins));
        z-index: 998;
      }

      .nav--mobile {
        display: none;
      }

      a:has(.nav__logo) {
        display: flex;
        align-items: center;
      }

      nav * {
        margin: 0;
      }

      .nav__logo {
        width: 150px;
      }

      .nav__links {
        display: flex;
        gap: 30px;
        align-items: center;
        list-style: none;
      }

      li {
        display: flex;
      }
      
      .nav__link, .nav__link:visited {
        display: flex;
        gap: 10px;
        align-items: center;
        text-decoration: none;
        color: var(--ct-black);
        font-family: 'sofia-bold';
        transition: opacity 0.4s;
      }

      .nav__link:hover, .nav__link:visited:hover, .nav__button:hover {
        color: var(--hover-color);
      }

      .nav__button {
        background: none;
        border: none;
        padding: 0;
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 1rem;
        cursor: pointer;
      }

      .nav__link.${this.section}, .nav__link ${this.section}:visited {
        color: var(--ct-red);
      }

      .nav__link.green {
        color: var(--ct-green);
      }

      .nav__messagecount {
        background-color: var(--ct-red);
        color: var(--ct-lightyellow);
        font-family: 'sofia-medium';
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }

      sl-menu {
        top: 30px;
        border-radius: 15px;
        border: none;
        background-color: var(--ct-lightyellow);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
      }

      sl-dropdown::part(panel) {
        box-shadow: none;
      }

      sl-menu-item::part(base):hover {
        background: var(--ct-midyellow);
      }

      @media screen and (max-width: 1024px) {
        .nav--desktop {
          display: none;
        }

        .nav--mobile {
          display: flex;
          flex-direction: column;
          padding: 15px 30px;
          justify-content: left;
        }

        .nav--mobile--upper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nav--mobile--lower {
          box-sizing: border-box;
          overflow: hidden;
          transition: all .5s;
          height: 0;
          width: 100%;
          position: relative;
          overflow-y: auto; /* may wanna remove this, bit inconsistent */
        }

        .nav--mobile--lower[data-expanded="false"] {
          height: 0;
        }

        .nav--mobile--lower[data-expanded="true"] {
          height: calc(100vh - 120px);
          display: flex;
          padding-top: 45px;
        }

        .nav--mobile__list {
          display: flex;
          flex-direction: column;
          gap: 30px;
          padding-inline-start: 0;
          overflow-y: auto;
          width: 100%;
          overscroll-behavior: contain;
          padding-bottom: 30px;
        }

        .nav--mobile__list li {
          display: block;
        }

        .nav--mobile__list li a, .nav--mobile__list li button {
          display: flex;
          align-items: center;
        }
        .nav--mobile__list.secondary {
          transition: 0.4s;
          position: absolute;
          top: 45px;
          left: 20%;
          opacity: 0;
          visibility: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .nav--mobile__list.secondary[data-expanded="true"] {
          overflow-y: auto;
          visibility: visible;
          left: 0;
          opacity: 1;
        }
        .nav__link.secondary {
          /* font-family: 'sofia-medium'; */
        }

        .nav__hamburger {
          background-color: transparent;
          border: none;
          padding: 0;
          margin: 0;
          height: fit-content;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .nav__hamburger:hover {
          color: var(--hover-color);
        }
      }

      @media screen and (max-width: 500px) {
        nav {
          top: 15px;
        }
        .nav--mobile--lower[data-expanded="true"] {
          max-height: calc(100vh - 60px;)
        }
        
      }
      
    </style>

    <nav class="nav--desktop">
      <a href="/dashboard" @click="${this.menuClick}"><img class="nav__logo" src="/images/ct-logo.svg" alt="Communiteam logo."></a>
      <ul class="nav__links">
        <li><a href="/dashboard" class="nav__link dashboard" @click="${this.menuClick}">${dashboardIcon}Dashboard</a></li>
        <li><a href="/explore" class="nav__link explore" @click="${this.menuClick}">${exploreIcon}Explore</a></li>
        <!--<li><a href="/myEvents" class="nav__link myevents">${myEventsIcon}My events</a></li>-->
        <li>
          <sl-dropdown>
            <button slot="trigger" class="nav__link nav__button myevents">${myEventsIcon}<p>My events</p></button>
            <sl-menu>
              <sl-menu-item><a href="/myEvents/posted" class="nav__link" @click="${this.menuClick}">${postIcon}Posted</a></sl-menu-item>
              <!--<sl-menu-item><a href="/myEvents/drafts" class="nav__link" @click="${this.menuClick}">${draftsIcon}Drafts</a></sl-menu-item>-->
              <sl-menu-item><a href="/myEvents/attending" class="nav__link" @click="${this.menuClick}">${attendingIcon}Attending</a></sl-menu-item>
              <sl-menu-item><a href="/myEvents/saved" class="nav__link" @click="${this.menuClick}">${savedIcon}Saved</a></sl-menu-item>
              <sl-menu-item><a href="/myEvents/newEvent" class="nav__link green" @click="${this.menuClick}">${postIcon}Post new event</a></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        </li>
        <!--<li><a href="/messages" class="nav__link messages" @click="${this.menuClick}">${messagesIcon}Messages ${this.messagecount > 0 ? html`<span class="nav__messagecount">${this.messagecount}</span>` : ""}</a></li>-->
        <li>

          <sl-dropdown>
            <button slot="trigger" class="nav__link nav__button profile">
              ${this.user && this.user.avatar ?
                html`<sl-avatar style="--size: 24px;" image='${App.apiBase}/images/${this.user.avatar}'></sl-avatar>` : 
                profileIcon
              }
              <p>
                ${this.user && this.user.firstName ? 
                  Utils.toTitleCase(this.user.firstName) : 
                  'Profile'}
              </p>
            </button>
            <sl-menu>
              <sl-menu-item><a href="/profile" class="nav__link" @click="${this.menuClick}">${profileIconSml}Profile</a></sl-menu-item>
              <sl-menu-item><a href="/" class="nav__link" @click="${() => Auth.signOut()}">${logoutIcon}Sign Out</a></sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          <!--
          <a href="/profile" class="nav__link profile">
            ${this.user.avatar ? 
              html`<sl-avatar style="--size: 24px;" image='${App.apiBase}/images/${this.user.avatar}'}></sl-avatar>` : 
              profileIcon}
            ${this.user.firstName ? this.user.firstName : 'Profile'}
          </a>-->
        </li>
      </ul>
    </nav>
    <nav class="nav--mobile">
      <div class="nav--mobile--upper">
        <a href="/dashboard" @click="${this.menuClick}"><img class="nav__logo" src="/images/ct-logo.svg" alt="Communiteam logo."></a>
        <button class="nav__hamburger" @click="${this.hamburgerToggle}" aria-expanded="false" aria-controls="nav--mobile--lower">${hamburgerIcon}</button>
      </div>
      
      <div class="nav--mobile--lower" id="nav--mobile--lower" data-expanded="false">
        <ul class="nav--mobile__list">
          <li><a href="/dashboard" @click="${this.menuClick}" class="nav__link dashboard">${dashboardIcon}Dashboard</a></li>
          <li><a href="/explore" @click="${this.menuClick}" class="nav__link explore">${exploreIcon}Explore</a></li>
          <li>
            <button class="nav__link nav__button myevents" @click="${this.eventsToggle}" aria-expanded="false" aria-controls="myevents--list">${myEventsIcon}My events${rightChevronIcon}</button>
            <ul class="nav--mobile__list secondary myevents" data-expanded="false" id="myevents--list">
              <li><button class="nav__link nav__button secondary" @click="${this.eventsBackToggle}">${leftChevronIcon}Back</button></li>
              <li><a class="nav__link secondary" href="/myEvents/posted" @click="${this.menuClick}">${postIcon}Posted</a></li>
              <!--<li><a class="nav__link secondary" href="/myEvents/drafts" @click="${this.menuClick}">${draftsIcon}Drafts</a></li>-->
              <li><a class="nav__link secondary" href="/myEvents/attending" @click="${this.menuClick}">${attendingIcon}Attending</a></li>
              <li><a class="nav__link secondary" href="/myEvents/saved" @click="${this.menuClick}">${savedIcon}Saved</a></li>
              <li><a class="nav__link secondary green" href="/myEvents/newEvent" @click="${this.menuClick}">${postIcon}Post new event</a></li>
            </ul>
          </li>
            
          <!--<li><a href="/messages" @click="${this.menuClick}" class="nav__link messages">${messagesIcon}Messages</a></li>-->
          <li><a href="/profile" @click="${this.menuClick}" class="nav__link profile">${profileIcon}Profile</a></li>
          <li><a href="/" class="nav__link" @click="${() => Auth.signOut()}">${logoutIcon}Sign Out</a></li>
            
        </ul>
      </div>
        
      </nav>
    `
  }
  
})
