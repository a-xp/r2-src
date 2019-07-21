import React from 'react';
import {appColors} from "@/api/enum";

export function AssassinIcon(props) {
    const {size = 40, color = appColors.spy} = props;
    return (
        <svg viewBox="0 0 496 496" height={40} width={40}>
            <path fill={color} d="M197.44,188c0-11.032-8.968-20-20-20s-20,8.968-20,20s8.968,20,20,20S197.44,199.032,197.44,188z M177.44,192
                c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S179.64,192,177.44,192z"/>
            <path fill={color} d="M313.44,168c-11.032,0-20,8.968-20,20s8.968,20,20,20c11.032,0,20-8.968,20-20S324.472,168,313.44,168z M313.44,192
                c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S315.64,192,313.44,192z"/>
            <path fill={color} d="M397.44,192v-26.528c15.4,15.032,42.584,34.528,80,34.528h8v-8c0-51.616-30.6-73.288-51.624-82.136
                c10.456-7.208,19.376-16.576,26.008-27.624c6.168-10.28,10.168-21.528,11.864-33.416L478.664,0h-26.488
                c-16.328,0-32.36,4.44-46.36,12.84c-14.72,8.832-26.552,21.608-34.232,36.96l-5.232,10.464C338.568,23.736,294.776,0,245.44,0
                c-83.816,0-152,68.184-152,152v40c0,64.024,39.848,118.816,96,141.176v3.528l-73.312,6.792
                c-36.952,5.688-68.048,32.424-79.192,68.12L10.56,496h469.76l-26.376-84.392c-11.152-35.696-42.24-62.432-79.68-68.176
                l-72.824-6.728v-3.528C357.592,310.816,397.44,256.024,397.44,192z M469.112,183.6c-41.752-3.992-67.736-36.84-72.248-42.984
                c-0.352-4.768-0.944-9.456-1.728-14.088l16.216-5.408c0.848-0.28,1.656-0.648,2.488-0.952
                C422.168,121.664,464.912,131.808,469.112,183.6z M385.904,56.96c6.312-12.624,16.048-23.136,28.16-30.4
                C425.576,19.656,438.752,16,452.184,16h8.032l-4.368,30.56c-1.4,9.768-4.672,19-9.744,27.448
                c-9.032,15.048-23.168,26.392-39.824,31.944l-14.664,4.888c-3.52-12.496-8.6-24.312-15.016-35.28L385.904,56.96z M245.44,16
                c46.984,0,88.472,23.96,112.912,60.288l-0.064,0.136l0.208,0.104c7.256,10.832,13,22.752,16.92,35.472H115.464
                C132.584,56.472,184.368,16,245.44,16z M109.44,192v-40c0-8.2,0.856-16.192,2.248-24h267.496c1.4,7.808,2.256,15.8,2.256,24v40
                c0,11.04-1.464,21.72-3.96,32h-68.04c-22.536,0-44.072-10.768-57.6-28.808l-6.4-8.52l-6.4,8.52
                C225.512,213.232,203.976,224,181.44,224H113.4C110.904,213.72,109.44,203.04,109.44,192z M118.664,480l6.696-46.864
                l-15.84-2.264L102.496,480H32.32l19.88-63.624c9.352-29.896,35.4-52.304,65.88-57.008l27.704-2.56
                c9.752,23.552,38.424,82.176,95.88,123.192H118.664z M271.56,480c-63.432-35.384-96.712-97.296-108.936-124.744l29.752-2.752
                l1.6,3.736c13.632,31.792,34.584,60.624,60.608,83.392c17.576,15.384,37.312,27.992,58.672,37.488l6.472,2.88H271.56z
                 M205.44,342.368v-3.888c12.768,3.496,26.136,5.52,40,5.52s27.232-2.024,40-5.52v3.888l-3.24,7.568
                c-9.104,21.224-21.584,40.56-36.84,57.832c-15.144-17.208-27.664-36.8-36.68-57.832L205.44,342.368z M328.616,355.28
                c-6.008,14.8-16.984,38.976-31.92,59.896l13.016,9.296c17.648-24.712,29.792-52.872,35.536-67.656l27.064,2.496
                c30.968,4.768,57.016,27.168,66.368,57.072L458.56,480h-70.176l-7.016-49.136l-15.84,2.264L372.216,480h-13.072l-39.384-17.504
                c-10.08-4.48-19.768-9.72-29.008-15.656c3.056-2.968,6.08-6.176,9.048-9.656l-12.168-10.376
                c-3.408,3.992-6.88,7.448-10.352,10.632c-4.16-3.144-8.224-6.416-12.152-9.856c-2.992-2.616-5.912-5.328-8.76-8.112
                c16.84-18.832,30.576-39.984,40.536-63.24l1.6-3.736L328.616,355.28z M245.44,328c-58.08,0-107.632-36.664-127.088-88h63.088
                c24.224,0,47.496-10.168,64-27.616c16.504,17.448,39.776,27.616,64,27.616h63.088C353.064,291.336,303.52,328,245.44,328z"/>

            <rect fill={color} x="297.446" y="118.059" transform="matrix(0.3165 0.9486 -0.9486 0.3165 356.7578 -183.109)" width="15.992" height="75.897"/>

            <rect fill={color} x="147.488" y="148.001" transform="matrix(0.9487 0.3162 -0.3162 0.9487 58.8399 -50.6309)" width="75.896" height="15.992"/>
        </svg>
    )
}